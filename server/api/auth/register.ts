import { eventHandler, sendError } from 'h3';
import { IUser } from '~~/types/IUser';
import bcrypt from 'bcrypt';
import { doesUserExists } from '~~/server/services/userService';
import { createUser } from '~~/server/database/repositories/userRepository';
import { makeSession } from '~~/server/services/sessionService';

/**
 * Обрабатываем событие регистрации пользователя
 */
export default eventHandler(async(event) => {
    const body = await readBody(event);

    const name: string = body.name;
    const email: string = body.email;
    const password: string = body.password;

    const userExists = await doesUserExists(email);

    if(userExists.value === true) {
        sendError(event, createError({ statusCode: 422, statusMessage: userExists.message }));
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10); 

    const userData: IUser = {
        name,
        email,
        password: encryptedPassword,
        loginType: 'email',
    }

    const user = await createUser(userData);

    return await makeSession(user, event);
});