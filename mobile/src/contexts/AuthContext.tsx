import { createContext, ReactNode, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { api } from "../services/api";

WebBroser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean
    singIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '319782430410-gt8g8tnfhl4hfs3srfq322vhsrvlrtcv.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function singIn() {
        try {
            setIsUserLoading(true)
            await promptAsync();
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            singInWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    async function singInWithGoogle(access_token: string) {
        console.log("Token de autenticação => ", access_token)

        try {
            setIsUserLoading(true);
            const tokenResponse = await api.post('/users', { access_token });
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;
            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user)
        } catch (error) {
            /* console.log(error) */
            throw error
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