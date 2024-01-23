import type { appRouter } from './app'
import type { createContext } from './context';

export type Context = Awaited<ReturnType<typeof createContext>>;

export type AppRouter = typeof appRouter;
