'use server';

export interface Guard {
  (): Promise<boolean> | boolean;
}

export const defineGuard = (guard: Guard) => guard;

export const applyGuards = async (...guards: Guard[]) => {
  for (const guard of guards) {
    const hasPassed = await guard();

    if (!hasPassed) break;
  }
};
