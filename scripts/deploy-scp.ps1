param(
    [string]$Command = "up",
    [string]$VpsHost = "31.97.168.137", 
    [string]$VpsUser = "root",
    [string]$RemoteDir = "/var/www/sistema_relatorio"
)

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Show-Help {
    Write-Host "Sistema de Relatorios - Deploy Remoto"
    Write-Host ""
    Write-Host "Uso: .\scripts\deploy-scp.ps1 [comando]"
    Write-Host ""
    Write-Host "Comandos disponiveis:"
    Write-Host "  up       - Sincronizar e iniciar servicos"
    Write-Host "  down     - Parar servicos"
    Write-Host "  logs     - Mostrar logs"
    Write-Host "  status   - Status dos containers"
    Write-Host "  ssh      - Conectar via SSH"
    Write-Host ""
}

function Execute-SSH {
    param([string]$RemoteCommand)
    Write-Info "Executando: $RemoteCommand"
    $target = "$VpsUser@$VpsHost"
    $fullCmd = "cd $RemoteDir; $RemoteCommand"
    ssh -o StrictHostKeyChecking=no $target $fullCmd
}

function Sync-Files {
    Write-Info "Sincronizando arquivos com a VPS usando SCP..."
    
    # Criar diretório remoto
    $target = "$VpsUser@$VpsHost"
    ssh -o StrictHostKeyChecking=no $target "mkdir -p $RemoteDir"
    
    # Criar um arquivo temporário com lista de exclusões
    $excludeList = @(
        "node_modules",
        ".git",
        "*.log",
        ".env",
        "storage/logs",
        "storage/framework/cache",
        "storage/framework/sessions",
        "storage/framework/views"
    )
    
    Write-Info "Criando arquivo temporario no servidor..."
    
    # Copiar arquivos essenciais usando SCP
    $filesToCopy = @(
        "docker-compose.yml",
        "docker-compose.prod.yml", 
        "backend",
        "frontend",
        "nginx",
        "README.md"
    )
    
    foreach ($item in $filesToCopy) {
        if (Test-Path $item) {
            Write-Info "Copiando $item..."
            scp -o StrictHostKeyChecking=no -r $item "${target}:${RemoteDir}/"
        }
    }
    
    Write-Success "Sincronizacao concluida!"
    return $true
}

function Start-Services {
    Write-Info "Iniciando servicos Docker..."
    Execute-SSH "docker compose down"
    Execute-SSH "docker compose up -d --build"
    Write-Success "Servicos iniciados!"
    Write-Info "Acesse: http://$VpsHost:8000"
}

function Stop-Services {
    Write-Info "Parando servicos..."
    Execute-SSH "docker compose down"
    Write-Success "Servicos parados!"
}

function Show-Logs {
    Execute-SSH "docker compose logs -f"
}

function Show-Status {
    Execute-SSH "docker compose ps"
}

function Connect-SSH {
    Write-Info "Conectando na VPS..."
    ssh "$VpsUser@$VpsHost"
}

# Menu principal
switch ($Command.ToLower()) {
    "up" {
        if (Sync-Files) {
            Start-Services
        }
    }
    "down" {
        Stop-Services
    }
    "logs" {
        Show-Logs
    }
    "status" {
        Show-Status
    }
    "ssh" {
        Connect-SSH
    }
    default {
        Show-Help
    }
} 