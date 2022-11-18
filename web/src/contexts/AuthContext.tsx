import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "../services/api";

interface UserProps {
    name: string;
    email: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean
    singIn: (email: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    async function singIn(email: string, password: string) {
        console.log("akiii")
        console.log(email)
        console.log(password)
        try {
            setIsUserLoading(true)
            const res = await api.post('login', {
                email,
                password
            })
            console.log(res)
            localStorage.setItem('token', res.data.token)
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            singIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}