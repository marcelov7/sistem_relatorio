#!/bin/bash

echo "🚀 Configurando Sistema de Relatórios..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para logs
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    log_error "Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Criar projeto Laravel se não existir
if [ ! -d "backend" ]; then
    log_info "Criando projeto Laravel..."
    composer create-project laravel/laravel backend
    cd backend
    
    # Instalar dependências adicionais
    composer require laravel/sanctum
    composer require spatie/laravel-cors
    
    cd ..
fi

# Criar projeto React se não existir
if [ ! -d "frontend" ]; then
    log_info "Criando projeto React..."
    npx create-react-app frontend --template typescript
    cd frontend
    
    # Instalar dependências PWA e outras
    npm install --save @types/react @types/react-dom
    npm install --save workbox-webpack-plugin
    npm install --save axios react-router-dom
    npm install --save @tailwindcss/forms tailwindcss autoprefixer postcss
    npm install --save react-query
    
    cd ..
fi

# Configurar variáveis de ambiente do Laravel
if [ ! -f "backend/.env" ]; then
    log_info "Configurando variáveis de ambiente do Laravel..."
    cp backend/.env.example backend/.env
    
    # Atualizar configurações de banco
    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/' backend/.env
    sed -i 's/DB_HOST=127.0.0.1/DB_HOST=db/' backend/.env
    sed -i 's/DB_PORT=3306/DB_PORT=3306/' backend/.env
    sed -i 's/DB_DATABASE=laravel/DB_DATABASE=relatorio_db/' backend/.env
    sed -i 's/DB_USERNAME=root/DB_USERNAME=relatorio_user/' backend/.env
    sed -i 's/DB_PASSWORD=/DB_PASSWORD=relatorio_pass/' backend/.env
fi

# Construir containers
log_info "Construindo containers Docker..."
docker-compose build

# Subir containers
log_info "Iniciando containers..."
docker-compose up -d

# Aguardar banco de dados
log_info "Aguardando banco de dados..."
sleep 30

# Executar migrations
log_info "Executando migrations..."
docker-compose exec app php artisan migrate

# Gerar chave da aplicação
log_info "Gerando chave da aplicação..."
docker-compose exec app php artisan key:generate

# Criar storage links
log_info "Criando storage links..."
docker-compose exec app php artisan storage:link

log_info "✅ Setup concluído!"
log_info "🌐 Frontend: http://localhost:3000"
log_info "🔧 Backend API: http://localhost:8000"
log_info "📊 PHPMyAdmin: http://localhost:8080"

echo ""
log_warning "Para parar os containers, use: docker-compose down"
log_warning "Para ver logs, use: docker-compose logs -f" 