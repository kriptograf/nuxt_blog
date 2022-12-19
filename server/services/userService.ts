/**
 * Сервис работы с пользователями
 */
import { getUserByEmail } from "~~/server/database/repositories/userRepository";

type ExistCheck = {
    value: boolean,
    message?: string,
}
/**
 * Проверка на существование зарегестрированного email
 * @param email 
 * @returns 
 */
export async function doesUserExists(email: string): Promise<ExistCheck> {
    const hasEmail = await getUserByEmail(email);
    const emailExists = hasEmail !== null;

    if(emailExists) {
        return { value: true, message: encodeURIComponent('Такой email уже зарегистрирован') };
    }

    return { value: false }
}