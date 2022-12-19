/**
 * Удаляем куки с токеном при разлогине
 */
export default defineEventHandler(async (event) => {
    deleteCookie(event, 'auth_token');

    return getCookie(event, 'auth_token');
});