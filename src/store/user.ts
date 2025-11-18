import { signify } from "react-signify";


interface User {
    id: number;
    name: string;
    email: string;
}

export const sUser = signify<User | null>({
    id: 0,
    name: '',
    email: ''
})