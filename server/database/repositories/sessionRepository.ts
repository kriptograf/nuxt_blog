import { IUser } from "~~/types/IUser";
import { ISession } from "~~/types/ISession";
import prisma from "~~/server/database/client";

/**
 * Сохраняем сессию пользователя в бд
 * @param data 
 * @returns 
 */
export async function createSession(data: ISession): Promise<ISession> {
    return await prisma.session.create({
        data: {
            userId: data.userId as number,
            authToken: data.authToken as string,
        }
    });
}

/**
 * Получить пользователя из сессии по токену
 * @param authToken 
 * @returns 
 */
export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
    const user: IUser = await getUserByAuthToken(authToken) as unknown as IUser;

    return { authToken, user };
}

/**
 * Получить пользователя по authToken через таблицу сессий
 * @param authToken 
 * @returns 
 */
async function getUserByAuthToken(authToken: string): Promise<IUser | null> {
    return prisma.session.findUnique({
        where: {
            authToken: authToken,
        }
    }).user();
}