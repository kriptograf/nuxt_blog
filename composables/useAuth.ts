import { ISession } from "~~/types/ISession";

/**
 * Регистрация по email и паролю
 * @param name 
 * @param email 
 * @param password 
 */
export async function registerWithEmail(name: string, email: string, password: string) {
    try {
        // -- Выполняем пост запрос к серверу api
        const res = await $fetch<ISession>('/api/auth/register', {
            method: 'POST',
            body: { name, email, password }
        });

        if(res) {
            // -- Создаем глобальную реактивную ссылку, которая будет гидратирована, но не будет использоваться совместно с запросами ssr.
            useState('user').value = res;
            // -- Программно перейдум к новому URL-адресу, запушив запись в стеке истории.
            await useRouter().push('/dashboard');
        }
    } catch (error: any) {
        console.log(`Error ${error.toString()}`);
    }
}