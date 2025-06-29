# 📊 Sistema de Relatórios - Laravel + React PWA

Sistema completo de gestão de relatórios desenvolvido com Laravel (backend) e React (frontend), configurado para rodar em Docker e pronto para deploy em VPS.

## 🚀 Características

### ✨ Frontend (React PWA)
- **React 18** com TypeScript
- **Progressive Web App (PWA)** - Funciona offline
- **Tailwind CSS** para styling moderno
- **React Router** para navegação
- **React Query** para gerenciamento de estado
- **Service Worker** para cache offline
- Design responsivo e mobile-first

### 🔧 Backend (Laravel)
- **Laravel 10** como API REST
- **MySQL 8** como banco de dados
- **Redis** para cache e sessões
- **Laravel Sanctum** para autenticação
- **Migrations** e **Seeders** incluídos

### 🐳 Infraestrutura
- **Docker** para desenvolvimento local
- **Docker Compose** para orquestração
- **Nginx** como reverse proxy
- **SSL/TLS** configurado para produção
- **Multi-stage builds** otimizados

## 📦 Requisitos

- [Docker](https://www.docker.com/get-started) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0+
- [Git](https://git-scm.com/)

## 🛠 Instalação e Setup

### 1. Clone do Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd Sistema_relatorio
```

### 2. Setup Automático

Execute o script de setup que irá configurar tudo automaticamente:

```bash
# Torne o script executável
chmod +x scripts/setup.sh

# Execute o setup
./scripts/setup.sh
```

### 3. Setup Manual (Alternativo)

Se preferir fazer o setup manualmente:

#### 3.1 Criar Projeto Laravel

```bash
# Crie o projeto Laravel
composer create-project laravel/laravel backend
cd backend

# Instale dependências adicionais
composer require laravel/sanctum
composer require spatie/laravel-cors

cd ..
```

#### 3.2 Criar Projeto React

```bash
# Crie o projeto React
npx create-react-app frontend --template typescript
cd frontend

# Instale dependências
npm install axios react-router-dom @tanstack/react-query
npm install tailwindcss autoprefixer postcss @tailwindcss/forms
npm install react-hot-toast lucide-react

cd ..
```

#### 3.3 Configurar Ambiente

```bash
# Configure o .env do Laravel
cp backend/.env.example backend/.env

# Edite as configurações de banco no backend/.env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=relatorio_db
DB_USERNAME=relatorio_user
DB_PASSWORD=relatorio_pass
```

#### 3.4 Subir Containers

```bash
# Construir e subir containers
docker-compose up -d

# Aguardar inicialização (30 segundos)
sleep 30

# Executar migrations
docker-compose exec app php artisan migrate

# Gerar chave da aplicação
docker-compose exec app php artisan key:generate

# Criar storage links
docker-compose exec app php artisan storage:link
```

## 🌐 Acessos do Sistema

Após a instalação, você pode acessar:

- **Frontend React**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **PHPMyAdmin**: http://localhost:8080

### 🔐 Credenciais Padrão

- **Email**: admin@example.com
- **Senha**: password

## 📱 Funcionalidades PWA

O sistema é uma Progressive Web App completa com:

- **Instalação no dispositivo**: Pode ser "instalada" como app nativo
- **Funcionamento offline**: Cache de recursos essenciais
- **Notificações push**: (Preparado para implementação)
- **Sincronização em background**: (Preparado para implementação)

### Instalação do PWA

1. Acesse o sistema no navegador
2. Procure pelo ícone "Instalar" na barra de endereços
3. Clique em "Instalar" para adicionar à tela inicial

## 🚀 Deploy para Produção (VPS)

### 1. Preparar VPS

```bash
# Instalar Docker na VPS
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env para produção
cp .env.example .env.prod

# Editar variáveis de produção
nano .env.prod
```

Exemplo do `.env.prod`:

```env
DB_PASSWORD=senha_super_segura_123
DB_ROOT_PASSWORD=root_senha_segura_456
REDIS_PASSWORD=redis_senha_789
CERTBOT_EMAIL=seu@email.com
DOMAIN=seudominio.com
```

### 3. Deploy com SSL

```bash
# Subir em produção
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Configurar SSL com Certbot
docker-compose -f docker-compose.prod.yml exec certbot certbot renew --dry-run
```

## 📚 Estrutura do Projeto

```
Sistem_relatorio/
├── backend/                 # Laravel API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── Dockerfile
├── frontend/                # React PWA
│   ├── public/
│   │   ├── manifest.json   # PWA manifest
│   │   └── sw.js          # Service Worker
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Context API
│   │   ├── pages/         # Páginas/Rotas
│   │   └── App.tsx
│   ├── tailwind.config.js
│   └── Dockerfile
├── nginx/                   # Configurações Nginx
│   ├── nginx.conf
│   └── sites/
├── scripts/                 # Scripts utilitários
│   └── setup.sh
├── docker-compose.yml      # Desenvolvimento
├── docker-compose.prod.yml # Produção
└── README.md
```

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Subir containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Acessar container do Laravel
docker-compose exec app bash

# Executar migrations
docker-compose exec app php artisan migrate

# Instalar dependências React
docker-compose exec frontend npm install
```

### Banco de Dados

```bash
# Backup do banco
docker-compose exec db mysqldump -u relatorio_user -p relatorio_db > backup.sql

# Restaurar backup
docker-compose exec -T db mysql -u relatorio_user -p relatorio_db < backup.sql

# Acessar MySQL
docker-compose exec db mysql -u relatorio_user -p
```

## 🎨 Customização

### Cores e Tema

Edite `frontend/tailwind.config.js` para personalizar:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores primárias
      },
    },
  },
},
```

### PWA Configurações

Edite `frontend/public/manifest.json` para personalizar:

- Nome da aplicação
- Ícones
- Cores do tema
- Orientação da tela

## 🛡 Segurança

### Desenvolvimento
- Senhas padrão configuradas
- CORS liberado para localhost
- Debug habilitado

### Produção
- Senhas complexas obrigatórias
- SSL/TLS configurado
- CORS restrito ao domínio
- Debug desabilitado
- Headers de segurança configurados

## 📊 Monitoramento

### Logs

```bash
# Logs do Laravel
docker-compose exec app tail -f storage/logs/laravel.log

# Logs do Nginx
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Logs do MySQL
docker-compose exec db tail -f /var/log/mysql/error.log
```

### Performance

- **Frontend**: React DevTools, Lighthouse
- **Backend**: Laravel Telescope, Laravel Debugbar
- **Banco**: MySQL Performance Schema

## 🔄 Atualizações

### Sistema

```bash
# Atualizar dependências do Laravel
docker-compose exec app composer update

# Atualizar dependências do React
docker-compose exec frontend npm update

# Backup antes de atualizações
./scripts/backup.sh
```

## 🐛 Solução de Problemas

### Problemas Comuns

**Container não sobe**:
```bash
docker-compose down
docker-compose up -d --force-recreate
```

**Erro de permissão Laravel**:
```bash
docker-compose exec app chown -R www-data:www-data storage/
docker-compose exec app chmod -R 755 storage/
```

**PWA não carrega offline**:
- Verifique se o Service Worker está registrado
- Limpe o cache do navegador
- Verifique a configuração em `frontend/public/sw.js`

## 📞 Suporte

Para dúvidas e suporte:

1. Verifique a documentação
2. Consulte os logs dos containers
3. Abra uma issue no repositório

## 🎯 Próximos Passos

- [ ] Implementar autenticação com 2FA
- [ ] Adicionar notificações push
- [ ] Implementar relatórios em PDF
- [ ] Adicionar charts e gráficos
- [ ] Implementar sistema de permissões
- [ ] Adicionar testes automatizados
- [ ] Configurar CI/CD

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Laravel + React + Docker** 