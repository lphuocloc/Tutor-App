import { signify } from "react-signify";
import type { Profile } from "../types/profile";
import { userAPI } from '../api/endpoints';


export const profile = signify<Profile[]>([])

export const useProfile = () => profile.use();

export const fetchProfile = async () => {
    try {
        const resp = await userAPI.getUserProfile();
        profile.set(resp.data);
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
};

export const useUserName = () => useProfile().map(profile => profile.fullName);

export const getUserNameByIdFromStore = (userList: Profile[], userId: number): string => {
    console.log('userList:', userList);
    console.log('userId:', userId);

    const user = userList.find((p: Profile) => p.userId == userId);  // Use == for type coercion
    console.log('found user:', user);
    return user ? user.fullName : '';
};