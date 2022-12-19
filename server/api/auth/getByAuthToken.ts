import { IUser } from "~~/types/IUser";
import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";

/**
 * Метод обработчик api получения пользователя по токену
 */
export default defineEventHandler<IUser>(async (event) => {
    const authToken = getCookie(event, 'auth_token');
    const user = await getUserBySessionToken(authToken as string);

    return user;
});