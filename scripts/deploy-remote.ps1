#!/usr/bin/env pwsh

# Script para desenvolvimento usando Docker na VPS remota
# Uso: .\scripts\deploy-remote.ps1 [comando]

param(
    [string]$Command = "up",
    [string]$VpsHost = "31.97.168.137",
    [string]$VpsUser = "root",
    [string]$RemoteDir = "/var/www/sistema_relatorio"
)

$ErrorActionPreference = "Stop"

function Write-Info {
    param([string]$Message)
    Write-Host "📋 $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Sync-Code {
    Write-Info "Sincronizando código com a VPS..."
    
    # Criar diretório remoto se não existir
    $createDirCmd = "mkdir -p $RemoteDir"
    ssh -o StrictHostKeyChecking=no "${VpsUser}@${VpsHost}" $createDirCmd
    
    # Verificar se rsync está disponível
    if (-not (Get-Command rsync -ErrorAction SilentlyContinue)) {
        Write-Error "rsync não está instalado. Use Git Bash ou WSL"
        return
    }
    
    # Sincronizar arquivos
    if (Test-Path ".rsyncignore") {
        rsync -avz --delete --exclude-from=".rsyncignore" ./ "${VpsUser}@${VpsHost}:${RemoteDir}/"
    } else {
        rsync -avz --delete --exclude="node_modules/" --exclude=".git/" --exclude="*.log" --exclude="storage/logs/" --exclude="storage/framework/cache/" --exclude="storage/framework/sessions/" --exclude="storage/framework/views/" --exclude=".env" ./ "${VpsUser}@${VpsHost}:${RemoteDir}/"
    }
    
    Write-Success "Código sincronizado com sucesso!"
}

function Execute-Remote {
    param([string]$RemoteCommand)
    Write-Info "Executando: $RemoteCommand"
    $fullCommand = 'cd ' + $RemoteDir + ' && ' + $RemoteCommand
    ssh -o StrictHostKeyChecking=no "${VpsUser}@${VpsHost}" $fullCommand
}

function Setup-Environment {
    Write-Info "Configurando ambiente na VPS..."
    
    # Verificar se Docker está instalado
    Execute-Remote "docker --version"
    Execute-Remote "docker-compose --version"
    
    # Criar arquivo .env se não existir
    Execute-Remote "test -f .env"
    if ($LASTEXITCODE -ne 0) {
        Execute-Remote "cp .env.example .env"
    }
    
    Write-Success "Ambiente configurado!"
}

function Start-Services {
    Write-Info "Iniciando serviços Docker na VPS..."
    
    Execute-Remote "docker-compose down"
    Execute-Remote "docker-compose up -d --build"
    
    Write-Success "Serviços iniciados!"
    Write-Info "Frontend: http://$VpsHost:3000"
    Write-Info "Backend: http://$VpsHost:8000"
    Write-Info "PhpMyAdmin: http://$VpsHost:8080"
}

function Stop-Services {
    Write-Info "Parando serviços Docker na VPS..."
    Execute-Remote "docker-compose down"
    Write-Success "Serviços parados!"
}

function Show-Logs {
    Write-Info "Mostrando logs dos serviços..."
    Execute-Remote "docker-compose logs -f"
}

function Show-Status {
    Write-Info "Status dos serviços:"
    Execute-Remote "docker-compose ps"
}

# Menu principal
switch ($Command.ToLower()) {
    "sync" {
        Sync-Code
    }
    "setup" {
        Sync-Code
        Setup-Environment
    }
    "up" {
        Sync-Code
        Start-Services
    }
    "down" {
        Stop-Services
    }
    "restart" {
        Stop-Services
        Start-Services
    }
    "logs" {
        Show-Logs
    }
    "status" {
        Show-Status
    }
    "ssh" {
        Write-Info "Conectando na VPS..."
        ssh "${VpsUser}@${VpsHost}"
    }
    default {
        Write-Host "🚀 Sistema de Relatórios - Deploy Remoto"
        Write-Host ""
        Write-Host "Uso: .\scripts\deploy-remote.ps1 [comando]"
        Write-Host ""
        Write-Host "Comandos disponíveis:"
        Write-Host "  sync     - Sincronizar código apenas"
        Write-Host "  setup    - Sincronizar e configurar ambiente"
        Write-Host "  up       - Sincronizar e iniciar serviços (padrão)"
        Write-Host "  down     - Parar serviços"
        Write-Host "  restart  - Reiniciar serviços"
        Write-Host "  logs     - Mostrar logs em tempo real"
        Write-Host "  status   - Mostrar status dos containers"
        Write-Host "  ssh      - Conectar via SSH na VPS"
        Write-Host ""
        Write-Host "Exemplos:"
        Write-Host "  .\scripts\deploy-remote.ps1 up"
        Write-Host "  .\scripts\deploy-remote.ps1 logs"
        Write-Host "  .\scripts\deploy-remote.ps1 ssh"
    }
} 