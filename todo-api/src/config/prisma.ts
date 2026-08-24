import {PrismaClient} from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import {envs} from './envs.js';

const adapter = new PrismaPg({connectionString: envs.POSTGRES_URL});
export const prisma = new PrismaClient({adapter});



