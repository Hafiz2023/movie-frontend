import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        // Make sure we connect to the correct database (usually handled by process.env.DATABASE_URL)
        // For local dev, prisma client should read from .env if in next.js
        // However, Prisma 7 config-based might need explicit adapter if not using default.
        // The previous error mentioned adapter or accelerateUrl
        // But migration worked so schema is correct.
        // Now runtime.
        // Next.js handles .env loading.
        // Prisma client by default reads from process.env.DATABASE_URL.
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
