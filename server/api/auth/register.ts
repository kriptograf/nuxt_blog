import { eventHandler } from 'h3';

/**
 * Обрабатываем событие регистрации пользователя
 */
export default eventHandler(async(event) => {
    return 'Hello from api';
});