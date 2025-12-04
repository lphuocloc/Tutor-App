import { signify } from "react-signify";
import { userAPI } from "../api/endpoints";


interface User {
    userId: number;
    email: string;
    phone: string;
    fullName: string;
    dateOfBirth: string;
    district: string;
    city: string
    role: string
}

export const sUser = signify<User[]>([]);

export const useUser = () => sUser.use();


// Actions
export const getUser = async () => {
    try {
        const res = await userAPI.getAllUsers();
        sUser.set(res.data);
        console.log("check user", res.data)
        return res.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        sUser.set([]);
        return []
    }

}