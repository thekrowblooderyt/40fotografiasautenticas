document.addEventListener('DOMContentLoaded', async () => {

    // --- Elements ---
    const bookContainer = document.getElementById('book');
    const bookWrapper = document.getElementById('bookWrapper');
    const pageInfo = document.getElementById('pageInfo');
    const pageInput = document.getElementById('pageInput');
    const introOverlay = document.getElementById('introOverlay');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Desktop Controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomDisplay = document.getElementById('zoomDisplay');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // Mobile Controls
    const mPrevBtn = document.getElementById('mPrevBtn');
    const mNextBtn = document.getElementById('mNextBtn');
    const mPageInfo = document.getElementById('mPageInfo');
    const dynamicBg = document.getElementById('dynamicBg');

    // --- State ---
    let pageFlip = null;
    let currentMode = null; // 'desktop' or 'mobile'
    let currentScale = 1;
    let totalPages = 44;
    let firstImageRatio = 0.707; // Default A4 approx

    // Pre-load first image for ratio (Mobile requirement)
    const firstImg = new Image();
    firstImg.src = 'ebook/page_1.webp';
    firstImg.onload = () => {
        firstImageRatio = firstImg.naturalWidth / firstImg.naturalHeight;
        startApp();
    };
    firstImg.onerror = () => {
        startApp(); // Proceed with default
    };

    function startApp() {
        // Create Pages first
        createPages();

        // Determine initial mode and start
        handleResize(true); // true = force init

        // Intro Animation handling
        // Animation sequence: 
        // 1. Title (1s)
        // 2. Subtitle (1s delay + 1s anim) = 2s total duration
        // 3. Pause for user to read (1.5s)
        // Total before fade: ~3.5s
        setTimeout(() => {
            if (introOverlay) {
                introOverlay.style.opacity = '0';
                setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
            }
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }, 3500);
    }

    function createPages() {
        // Clear container just in case
        bookContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const div = document.createElement('div');
            // Unified class name 'my-page' as used in styles
            div.className = 'my-page';

            // Hard covers
            if (i === 1 || i === totalPages) {
                div.classList.add('-hard');
                div.classList.add('hard'); // Mobile lib uses specific hints sometimes
            } else {
                div.classList.add('-soft');
            }

            const img = document.createElement('img');
            img.src = `ebook/page_${i}.webp`;
            img.loading = "eager";
            img.draggable = false;

            div.appendChild(img);
            bookContainer.appendChild(div);
        }
    }

    // --- State Machine ---
    window.addEventListener('resize', () => {
        // Debounce resize
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            handleResize(false);
        }, 200);
    });

    function handleResize(force = false) {
        const width = window.innerWidth;
        const newMode = width <= 768 ? 'mobile' : 'desktop';

        if (force || newMode !== currentMode) {
            // Mode changed! Re-initialize.
            console.log(`Switching to ${newMode} mode.`);
            currentMode = newMode;
            initBook(newMode);
        } else if (newMode === 'mobile') {
            // If already mobile, reload to recalculate dimensions properly
            // Check if dimensions actually changed significantly to avoid keyboard-pops
            if (Math.abs(window.innerWidth - document.body.clientWidth) > 0 ||
                Math.abs(window.innerHeight - window.innerHeight) > 100) { // Naive check or just reload
                // Simplest robust solution for "change resolution" is reload
                window.location.reload();
            }
        }
    }

    function initBook(mode) {
        // 1. Destroy existing
        if (pageFlip) {
            pageFlip.destroy();
            pageFlip = null;
        }

        // 2. Clear Styles from Container (PageFlip messes with them)
        // Re-inject pages to be safe from internal modifications? 
        // Actually destroying pageFlip usually leaves DOM in a state, 
        // sometimes cleaner to clear InnerHTML and rebuild.
        createPages();

        if (mode === 'desktop') {
            initDesktop();
        } else {
            initMobile();
        }

        // 3. Common Events
        pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));

        pageFlip.on('flip', (e) => {
            updateInfo();
        });

        // Initial Info
        updateInfo();
    }

    function initDesktop() {
        pageFlip = new St.PageFlip(bookContainer, {
            width: 800,
            height: 600,
            size: 'stretch',
            minWidth: 400,
            maxWidth: 1600,
            minHeight: 300,
            maxHeight: 1200,
            maxShadowOpacity: 0.5,
            showCover: true,
            mobileScrollSupport: false, // We handle mobile separately
            usePortrait: false, // 2-page spread
            startPage: 0
        });
    }

    function initMobile() {
        // Dynamic Sizing Logic
        // We calculate the *Exact* dimensions the "PageFlip" instance should have
        // based on the visible viewport and the image aspect ratio.
        const viewport = document.getElementById('bookWrapper') || document.body; // mobile uses body/wrapper
        // For mobile, we want to use the full window minus UI margins
        const availableWidth = window.innerWidth;
        const availableHeight = window.innerHeight;

        const marginX = 20;
        const marginY = 120; // More space for controls

        const maxWidth = availableWidth - marginX;
        const maxHeight = availableHeight - marginY;

        let finalWidth, finalHeight;

        // Fit logic
        if (maxWidth / maxHeight < firstImageRatio) {
            // Limited by Width
            finalWidth = maxWidth;
            finalHeight = finalWidth / firstImageRatio;
        } else {
            // Limited by Height
            finalHeight = maxHeight;
            finalWidth = finalHeight * firstImageRatio;
        }

        pageFlip = new St.PageFlip(bookContainer, {
            width: finalWidth,
            height: finalHeight,
            size: 'fixed', // Strict size
            minWidth: 200,
            maxWidth: 3000,
            minHeight: 200,
            maxHeight: 3000,
            showCover: true,
            usePortrait: true, // Single Page
            startPage: 0,
            flippingTime: 600,
            mobileScrollSupport: false
        });
    }

    // --- Updates & Logic ---
    function updateInfo() {
        if (!pageFlip) return;

        const current = pageFlip.getCurrentPageIndex() + 1;
        const total = pageFlip.getPageCount();

        if (currentMode === 'desktop') {
            pageInput.value = current;
            pageInfo.textContent = ` / ${total}`;
            pageInput.max = total;

            // Shadow logic
            const wrapper = bookContainer.querySelector('.stf__wrapper');
            if (wrapper) {
                if (pageFlip.getCurrentPageIndex() === 0) wrapper.classList.remove('open-book');
                else wrapper.classList.add('open-book');
            }
        } else {
            // Mobile Info
            if (mPageInfo) mPageInfo.textContent = `${current} / ${total}`;
        }

        // Dynamic Background (Common for both modes now)
        // Use 'current' index. For desktop spreads, it usually picks the left page which is fine.
        const currentImage = `ebook/page_${current}.webp`;
        if (dynamicBg) {
            // Preload
            const img = new Image();
            img.src = currentImage;
            img.onload = () => {
                dynamicBg.style.backgroundImage = `url('${currentImage}')`;
            };
        }
    }

    // --- Controls Events ---

    // Desktop Nav
    nextBtn.addEventListener('click', () => { if (pageFlip) pageFlip.flipNext(); });
    prevBtn.addEventListener('click', () => { if (pageFlip) pageFlip.flipPrev(); });

    // Mobile Nav
    mNextBtn.addEventListener('click', () => { if (pageFlip) pageFlip.flipNext(); });
    mPrevBtn.addEventListener('click', () => { if (pageFlip) pageFlip.flipPrev(); });

    // Zoom
    zoomInBtn.addEventListener('click', () => {
        if (currentScale < 3.0) {
            currentScale += 0.1;
            updateZoom();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (currentScale > 0.5) {
            currentScale -= 0.1;
            updateZoom();
        }
    });

    function updateZoom() {
        if (bookWrapper) {
            bookWrapper.style.transform = `scale(${currentScale})`;
            if (zoomDisplay) zoomDisplay.textContent = Math.round(currentScale * 100) + '%';
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullScreen);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Disable Context Menu
    document.addEventListener('contextmenu', event => event.preventDefault());

});
