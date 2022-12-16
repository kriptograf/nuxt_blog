export interface IUser {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    creditAccount?: number,
    avatarUrl?: string,
    joined?: string,
    userType?: number,
    verified?: boolean,
    title?: string,
    website?: string,
    country?: number,
    categories?: string,
    skills?: string,
    about?: string,
    jobsNotifications?: boolean
}