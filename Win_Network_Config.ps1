$ErrorActionPreference = "SilentlyContinue"
$host.UI.RawUI.WindowTitle = "System Integrity Check - Do Not Close"
Clear-Host

# Colores caóticos
$colors = @("Green", "DarkGreen", "Red", "DarkRed", "Cyan", "Yellow", "Magenta", "White")

Write-Host "INITIALIZING HEURISTIC OVERRIDE..." -ForegroundColor Red
Start-Sleep -Seconds 1
Write-Host "BYPASSING KERNEL PROTECTIONS..." -ForegroundColor Red
Start-Sleep -Seconds 1

# Configuración de tiempo: 3 minutos (180 segundos)
$totalTimeSeconds = 180
$startTime = Get-Date

$frases_rapidas = @(
    "INJECTING PAYLOAD 0x",
    "DUMPING MEMORY BLOCK ",
    "DECRYPTING SECTOR ",
    "FORCING HANDSHAKE PORT ",
    "ESCALATING PRIVILEGES UID ",
    "OVERWRITING MBR ",
    "EXTRACTING REGISTRY HIVE ",
    "SNIFFING PACKETS VLAN "
)

Write-Host "`nWARNING: SYSTEM COMPROMISED. INITIATING MASS DATA EXTRACTION." -ForegroundColor Red -BackgroundColor Black
Write-Host "DO NOT POWER OFF OR DISCONNECT FROM NETWORK." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Bucle caótico (3 minutos de matrix/virus)
while ((Get-Date) -lt $startTime.AddSeconds($totalTimeSeconds)) {
    # 1. Generar montón de números hexadecimales aleatorios a toda velocidad
    $hexString = ""
    for ($j = 0; $j -lt 20; $j++) {
        $hexString += "{0:X4} " -f (Get-Random -Minimum 0 -Maximum 65535)
    }
    
    # 2. Elegir una frase "peligrosa" al azar
    $frase = $frases_rapidas | Get-Random
    $rndNum = Get-Random -Minimum 1000 -Maximum 99999
    
    # 3. Mostrar en un color al azar
    $col = $colors | Get-Random
    
    Write-Host "$frase$rndNum -> $hexString" -ForegroundColor $col
    
    # Pausa minúscula para dar efecto de "matrix de datos crudos"
    Start-Sleep -Milliseconds 40
}

Clear-Host
Write-Host "==========================================================================================" -ForegroundColor Red
Write-Host "                     S Y S T E M   C O M P R O M I S E D                                " -ForegroundColor White -BackgroundColor DarkRed
Write-Host "==========================================================================================" -ForegroundColor Red
Write-Host "DECRYPTING FINAL DATA PAYLOAD..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

Write-Host "`n==========================================================================================" -ForegroundColor Green
Write-Host "           B A S E   D E   D A T O S   E X T R A I D A   C O N   E X I T O              " -ForegroundColor White -BackgroundColor DarkRed
Write-Host "==========================================================================================" -ForegroundColor Green

$datosExtraidos = @"
NOMBRE DEL DISPOSITIVO,DIRECCIÓN IP,ESTADO,MODELO,VERSIÓN,Tiempo de actividad
Router Principal,192.168.0.1,Conectado,ER8411 v1.0,1.3.2,21h 43m 39s
Switch Computo,192.168.0.143,Conectado,SG2428P v5.20,5.20.11,5day(s) 6h 46s
Switch Edificio Nuevo,192.168.0.2,Conectado,SG3452P v3.30,3.30.9,5day(s) 4h 29m 26s
Switch Escalera,192.168.0.144,Conectado,SG2210P v5.20,5.20.10,5day(s) 5h 55m 4s
Switch SITE,192.168.0.23,Conectado,SG2428P v5.20,5.20.11,4day(s) 5h 21m 41s
0C-EF-15-CF-23-2A,192.168.0.11,Conectado,EAP655-Wall(US) v1.0,1.4.2,5day(s) 5h 59m 24s
332,192.168.0.10,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m 3s
60-83-E7-FC-B0-C8,192.168.0.12,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m 1s
A8-42-A1-B2-28-CE,192.168.0.15,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 40s
A8-42-A1-B2-2D-7E,192.168.0.19,DESCONECTADO,EAP235-Wall(US) v1.0,3.2.3,--
A8-42-A1-B2-41-FC,192.168.0.9,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m 3s
AP Oficina Nueva,192.168.0.22,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 55s
Aula 1 Edif Nuevo,192.168.0.20,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 59s
Aula 122,192.168.0.25,Conectado,EAP225(US) v5.0,1.3.1,5day(s) 5h 53m 19s
Aula 123,192.168.0.26,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 53m 36s
Aula 132,192.168.0.28,Conectado,EAP225(US) v5.0,1.3.1,5day(s) 5h 53m 24s
Aula 133,192.168.0.27,Conectado,EAP225(US) v5.0,1.3.1,5day(s) 5h 53m 46s
Aula 2 Edif Nuevo,192.168.0.19,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 35s
Aula 212,192.168.0.30,Conectado,EAP235-Wall(US) v1.0,3.2.3,4day(s) 5h 21m 30s
Aula 216,192.168.0.137,DESCONECTADO,EAP235-Wall(US) v1.0,3.1.1,--
Aula 221,192.168.0.17,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 3s
Aula 223,192.168.0.120,DESCONECTADO,EAP235-Wall(US) v1.0,3.2.3,--
Aula 232,192.168.0.4,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 22s
Aula 234,192.168.0.14,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 19s
Aula 235,192.168.0.6,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 25s
Aula 236,192.168.0.8,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 22s
Aula 237,192.168.0.13,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 5h 59m 24s
Aula 238,192.168.0.24,DESCONECTADO,EAP235-Wall(US) v1.0,3.1.1,--
Aula 3 Edif Nuevo,192.168.0.21,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 39s
Cocina,192.168.0.33,Conectado,EAP655-Wall(US) v1.0,1.4.2,4day(s) 5h 20m 59s
CoordinacionPosgrado,192.168.0.29,Conectado,EAP235-Wall(US) v1.0,3.2.3,4day(s) 5h 21m 19s
Robotica,192.168.0.5,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m 7s
Robotica 2,192.168.0.31,Conectado,EAP655-Wall(US) v1.0,1.4.2,6day(s) 37m 59s
Sala Maestros,192.168.0.42,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m
aula 321,192.168.0.3,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 28m 3s
laboratorio química,192.168.0.7,Conectado,EAP235-Wall(US) v1.0,3.2.3,5day(s) 4h 27m 51s
"@

$tablaObj = $datosExtraidos | ConvertFrom-Csv
$tablaObj | Format-Table -AutoSize

Write-Host "`n==========================================================================================" -ForegroundColor Red
Write-Host "                              D A T O S   E N V I A D O S                               " -ForegroundColor Green
Write-Host "==========================================================================================" -ForegroundColor Red

Write-Host "`nSYSTEM LOCKED. REQUIRED ACCESS CODE GENERATED." -ForegroundColor Yellow -BackgroundColor Red
Write-Host "`n[ CÓDIGO DE ACCESO: HD2UPX ]" -ForegroundColor Cyan -BackgroundColor Black
Write-Host "`nAwaiting administrative override..." -ForegroundColor DarkGray

# Bucle infinito para que la ventana no se cierre
while ($true) {
    Start-Sleep -Seconds 1
}
