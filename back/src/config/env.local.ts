import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL: string = process.env.POSTGRES_URL ="postgres://default:YLHRZiQ5Ds6o@ep-white-unit-a4b61ngy-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
export const POSTGRES_PRISMA_URL="postgres://default:YLHRZiQ5Ds6o@ep-white-unit-a4b61ngy-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
export const POSTGRES_URL_NO_SSL="postgres://default:YLHRZiQ5Ds6o@ep-white-unit-a4b61ngy-pooler.us-east-1.aws.neon.tech:5432/verceldb"
export const POSTGRES_URL_NON_POOLING="postgres://default:YLHRZiQ5Ds6o@ep-white-unit-a4b61ngy.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
export const POSTGRES_USER: string = process.env.POSTGRES_USER ="default"
export const POSTGRES_HOST: string = process.env.POSTGRES_HOST ="ep-white-unit-a4b61ngy-pooler.us-east-1.aws.neon.tech"
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD ="YLHRZiQ5Ds6o"
export const POSTGRES_DATABASE: string = process.env.POSTGRES_DATABASE ="verceldb"