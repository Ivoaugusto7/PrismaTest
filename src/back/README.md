# Backend

API Express/TypeScript com Prisma e PostgreSQL, preparada para Render.

O `render.yaml` na raiz fornece `DATABASE_URL` automaticamente e executa:

```bash
npm ci
npm run db:generate
npm run build
npm run db:deploy
npm run db:seed
npm start
```

Variáveis:

- `DATABASE_URL`: conexão PostgreSQL.
- `CORS_ORIGIN`: URL pública da Vercel; aceita múltiplas origens por vírgula.
- `DEFAULT_SELLER_NAME`: vendedor criado pelo seed.
- `PORT`: fornecida automaticamente pelo Render.
