# NodePost Frontend

**NodePost** é uma plataforma de blogging desenvolvida como parte de um projeto de pós-graduação. O objetivo é fornecer um espaço para que professores da rede pública possam compartilhar suas aulas e conhecimentos.

## Tecnologias

- **Frontend**: React, TailwindCSS
- **Backend**: [Nodepost Backend](https://github.com/fernandoamaral/nodepost-backend)

## Como Instalar

### Instalação com Docker

```bash
docker run -p 80:80 fernandoamaral/nodepost-frontend
```

### Instalação sem Docker

```bash
# clone o repositório
git clone https://github.com/fernandoamaral/nodepost-frontend.git

# edite a URL do backend no .env
cd nodepost-frontend
echo 'VITE_API_BASE_URL=http://localhost:3000' > .env

# rode o projeto
npm install
npm run dev
```

## Deploy

Após o deploy do backend e do frontend, a aplicação pode ser acessada pela URL https://nodepost.ddns.net.

A aplicação atual é apenas um exemplo. Algumas alterações seriam necessárias para um ambiente de produção, como a remoção dos links de `cadastro` e `login` dos professores.