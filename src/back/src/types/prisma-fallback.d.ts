// Fallback apenas para permitir type-check quando o Prisma Client ainda não foi gerado.
// Após `npm run db:generate`, o cliente real de `@prisma/client` assume em runtime.
declare module '@prisma/client' {
  export const Prisma: {
    PrismaClientKnownRequestError: new (...args: any[]) => Error & { code?: string; meta?: unknown };
  };

  export class PrismaClient {
    constructor(...args: any[]);
    vendedor: any;
    orcamento: any;
    itemOrcamento: any;
    parametro: any;
    parametroCalculo: any;
    $transaction: any;
    $queryRaw: any;
    $disconnect(): Promise<void>;
  }

  export type Vendedor = any;
  export type Orcamento = any;
  export type ItemOrcamento = any;
  export type Parametro = any;
}
