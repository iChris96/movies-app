import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const SALT_ROUNDS = 10;

export const HEADER_TOKEN = 'Authorization';

export const TOKEN_EXP = 60; // 60 * 60 * 24; // 1 day

export const TOKEN_SECRET: string = process.env.SECRET_TOKEN as string;
