import type { randomUUID } from 'crypto';

export type UUID = ReturnType<typeof randomUUID>;
