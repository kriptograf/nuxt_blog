/**
 * Сервис для работы с сессиями
 */
import { H3Event } from 'h3';
import { IUser } from "~~/types/IUser";
import { v4 as uuidv4 } from 'uuid';
import { createSession, getSessionByAuthToken } from '~~/server/database/repositories/sessionRepository';

/**
 * Создадим сессию и вернем пользователя
 * @param user 
 * @param event 
 * @returns 
 */
export async function makeSession(user: IUser, event: H3Event): Promise<IUser> {
   const authToken = uuidv4().replaceAll('-', '');
   const session = await createSession({ authToken, userId: user.id as number });
   const userId = session.userId;

   if(userId) {
      setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true });
      return getUserBySessionToken(authToken);
   }

   throw Error('Error creating session');
}

/**
 * Получим из репозитория сессию и вернем пользователя
 * @param authToken 
 * @returns 
 */
export async function getUserBySessionToken(authToken: string): Promise<IUser> {
   const session = await getSessionByAuthToken(authToken);

   return session.user as IUser;
}