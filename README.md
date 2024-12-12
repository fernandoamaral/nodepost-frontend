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
git clone https://github.com/fernandoamaral/nodepost-backend.git

# edite a URL do backend no .env
cd nodepost-backend
echo 'VITE_API_BASE_URL=http://localhost:3000' > .env

# rode o projeto
npm install
npm run start
```