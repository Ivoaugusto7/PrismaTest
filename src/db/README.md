# Banco de dados

O banco é um PostgreSQL gerenciado pelo Render, definido no `render.yaml` da
raiz. O schema e o histórico executável ficam em:

```txt
../back/prisma/schema.prisma
../back/prisma/migrations/
```

O Render fornece `DATABASE_URL` automaticamente. A API executa
`prisma migrate deploy` e o seed durante a inicialização.

O plano gratuito tem 1 GB, não inclui backups e expira após 30 dias. Use um
plano pago antes de armazenar dados reais de produção.
