import { ISession } from "~~/types/ISession";
import { IUser } from "~~/types/IUser";

/**
 * Получить данные пользователя из кукисов
 * @returns 
 */
export const useAuthCookie = () => useCookie('auth_token');

/**
 * Получение данных пользователя по токену
 * @returns 
 */
export async function useUser(): Promise<IUser | null> {
    const authCookie = useAuthCookie().value;
    const user = useState<IUser | null>('user');

    if(authCookie && !user.value) {
        const { data } = await useFetch('/api/auth/getByAuthToken', {
            // -- @todo не красиво, потом разобраться с ошибкой
            headers: useRequestHeaders(['cookie'])
        });
        user.value = data.value;
    }

    return user.value;
}

/**
 * Логаут пользователя
 */
export async function userLogout() {
    try {
        await useFetch('/api/auth/logout', {
            method: 'POST'
        });
        useState('user').value = null;
        await useRouter().push('/');
    } catch (error: any) {
        console.log(`Произошла ошибка ${error.toString()}`);
    }
    
}

/**
 * Регистрация по email и паролю
 * @param name 
 * @param email 
 * @param password 
 */
export async function registerWithEmail(name: string, email: string, password: string): Promise<FormValidation> {
    try {
        // -- Выполняем пост запрос к серверу api
        const { data, error } = await $fetch<ISession>('/api/auth/register', {
            method: 'POST',
            body: { name, email, password }
        });

        if(error.value) {
            type ErrorData = {
                data: ErrorData
            }

            const errorData = error.value as unknown as ErrorData;
            const errors = errorData.data.data as unknown as string;
            const res = JSON.parse(errors);
            const errorMap = new Map<string, { check: InputValidation; }>(Object.entries(res));

            return { hasErrors: true, errors: errorMap };
        }
        
        if(data) {
            // -- Создаем глобальную реактивную ссылку, которая будет гидратирована, но не будет использоваться совместно с запросами ssr.
            useState('user').value = data;
            // -- Программно перейдем к новому URL-адресу, запушив запись в стеке истории.
            await useRouter().push('/dashboard');
        }
    } catch (error: any) {
        console.log(`Произошла ошибка ${error.toString()}`, error);
    }
}