# PROLAJE — Vercel + Render

Monorepo mínimo pronto para GitHub:

```txt
back/   API Express, Prisma e migrations PostgreSQL
db/     documentação do banco gerenciado
front/  React/Vite para Vercel
```

## Backend e PostgreSQL no Render

1. Selecione **New > Blueprint** no Render.
2. Conecte este repositório e use o `render.yaml` da raiz.
3. Defina `CORS_ORIGIN` com a URL final da Vercel.
4. Aguarde o banco, migrations, seed e API.
5. Confirme `https://SEU-BACKEND.onrender.com/health`.

O PostgreSQL gratuito possui 1 GB, não tem backups e expira após 30 dias.

## Frontend na Vercel

1. Importe o mesmo repositório.
2. Defina **Root Directory** como `front`.
3. Configure:

```env
VITE_API_BASE_URL=https://SEU-BACKEND.onrender.com
VITE_API_TIMEOUT_MS=30000
VITE_USE_LOCAL_FALLBACK=false
```

4. Faça o deploy.
5. Confirme no Render que `CORS_ORIGIN` é exatamente a URL da Vercel.

## Validação local

```bash
cd back
npm ci
npm run db:generate
npm run build

cd ../front
npm ci
npm run build
```
