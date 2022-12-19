import prisma from "~~/server/database/client";
import { IUser } from "~~/types/IUser";

/**
 * Получаем пользователя по email
 * @param email 
 * @returns 
 */
export async function getUserByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        }
    });
}

/**
 * Добавляем данные пользователя в базу данных
 * @param data IUser
 * @returns 
 */
export async function createUser(data: IUser) {
    const user = prisma.user.create({
        data: {
            name: data.name,
            email: data.email!,
            loginType: data.loginType,
            password: data.password
        }
    });

    return user;
}