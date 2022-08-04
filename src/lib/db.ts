import * as prisma from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const Client = prisma.PrismaClient || PrismaClient

export const db = new Client()