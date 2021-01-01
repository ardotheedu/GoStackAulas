interface TechObject {
    title: string;
    experience: number;
}

interface CreateUserData {
    name?: string; // -> name?: indica que o nome é opcional
    email: string;
    password: string;
    techs: Array<string | TechObject>;
}
export default function createUser({name, email, password}: CreateUserData) {
    const user = {
        name,
        email,
        password
    }
    return user;
}