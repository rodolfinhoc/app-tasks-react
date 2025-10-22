
# Minhas Tarefas — README

> Aplicação de exemplo **Minhas Tarefas** — Frontend em **React + Tailwind CSS** e Backend em **NestJS + TypeORM (MySQL)**.  
> Projeto para avaliar uma solução full-stack com CRUD de tarefas (create, read, update status, delete), validações, persistência relacional e boas práticas.


# 🚀 Visão geral

Aplicação simples de To-Do list com operações:

-   Criar tarefa
    
-   Listar tarefas
    
-   Buscar por id
    
-   Atualizar status (pendente ⇄ concluída)
    
-   Deletar tarefa
    

O objetivo é mostrar organização do código, componentização no frontend, validação no backend, testes básicos e documentação (Swagger).

# 🧩 Tecnologias

**Backend**

-   Node.js + NestJS (v11.x conforme `package.json`)
    
-   TypeScript
    
-   TypeORM (v0.3.x)
    
-   MySQL (driver `mysql2`) — pode ser trocado por PostgreSQL se preferir
    
-   class-validator / class-transformer
    
-   Swagger (`@nestjs/swagger`, `swagger-ui-express`)
    
-   Jest / Supertest para testes
    

**Frontend**

-   React (v19.x)
    
-   Vite
    
-   TypeScript (projeto sugerido em TS)
    
-   Tailwind CSS (v4.x) + `@tailwindcss/vite`
    
-   Axios para consumir API
    
-   lucide-react para ícones
    


# ⚙️ Instalação e execução (desenvolvimento)

> Pré-requisitos: Node.js >= 18, npm ou yarn, Docker (opcional), MySQL local (ou via Docker).

## Backend (NestJS)

1.  Entre na pasta do backend:
    

```bash
cd api
```

2.  Instale dependências:
    

```bash
npm install
```

3.  Ajuste as variáveis de ambiente (veja seção abaixo).
    
4.  Rodar em modo dev:
    

```bash
npm run start:dev
```

-   O NestJS, por padrão, roda em `http://localhost:3000` (confirme em `src/main.ts`).

## Frontend (React + Vite + Tailwind)

1.  Entre na pasta do frontend:
    

```bash
cd frontend

```

2.  Instale dependências:
    

```bash
npm install
# ou
yarn

```

3.  Rodar em desenvolvimento:
    

```bash
npm run dev

```

-   Por padrão o Vite serve em `http://localhost:5173`.


# 🧾 Variáveis de ambiente
```
DATABASE_HOST=localhost

DATABASE_PORT=3306

DATABASE_USER=root

DATABASE_PASSWORD=

DATABASE_NAME=minhas_tarefas_db
```

> No `app.module.ts` ou `ormconfig.ts` configure TypeORM para ler essas variáveis (ex.: `synchronize: true` apenas em dev).

# 🔁 Endpoints da API (REST)

**Base:** `http://localhost:3000`

-   `POST /tasks` — Criar nova tarefa
    
    -   Body (JSON): `{ "descricao": "Comprar leite" }`
        
    -   Respostas:
        
        -   `201 Created` — tarefa criada (retorna objeto tarefa)
            
        -   `400 Bad Request` — validação falhou (descricao obrigatória)
            
-   `GET /tasks` — Listar todas as tarefas
    
    -   Query optional: `?status=pending|done` (se quiser filtrar no backend)
        
    -   `200 OK` retorna array de tarefas
        
-   `GET /tasks/:id` — Buscar tarefa por ID
    
    -   `200 OK` tarefa encontrada
        
    -   `404 Not Found` se não existir
        
-   `PATCH /tasks/:id/status` — Atualizar status (toggle ou body com status)
    
    -   Body opcional: `{ "status": "done" }` (ou sem body para alternar)
        
    -   `200 OK` retorna tarefa atualizada
        
    -   `404 Not Found` se id inválido
        
-   `DELETE /tasks/:id` — Remover tarefa
    
    -   `204 No Content` quando removido com sucesso
        
    -   `404 Not Found` se não existir
        

### Exemplo com `curl`

```bash
# Criar
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Estudar NestJS"}'

# Listar
curl http://localhost:3000/tasks

# Atualizar status
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Deletar
curl -X DELETE http://localhost:3000/tasks/1

```

# 📦 Boas práticas

-   **TypeORM + Entities + DTOs**: separação clara entre camada de persistência e transferência de dados.
    
-   **DTOs + class-validator**: validações declarativas e mensagens consistentes.
    
-   **Services**: lógica de negócio isolada de controllers — facilita testes.
    
-   **Modularização (tasks module)**: escalabilidade e organização por domínio.
    
-   **Frontend componentizado**: `TaskList`, `TaskItem`, `NewTaskForm`, `Filters` — cada componente com responsabilidade única.
    
-   **Acessibilidade**: inputs com `label`, botões com `aria-labels`, semântica `ul/li` para listas.
    
-   **Comandos npm claros**: scripts para dev, build, test e lint.
    
