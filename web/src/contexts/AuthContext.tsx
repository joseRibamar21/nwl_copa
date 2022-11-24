import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { User } from "../@types/user";

import { api } from "../services/api";



export interface AuthContextDataProps {
  user: User;
  isUserLoading: boolean;
  singIn: (email: string, password: string) => Promise<void>;
  inicialization(): void
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const router = useRouter()

  async function singIn(email: string, password: string) {
    try {
      setIsUserLoading(true)
      const res = await api.post('login', {
        email,
        password
      })
      console.log(res)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user)
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function inicialization() {
    setIsUserLoading(true);
    const dataUser = sessionStorage.getItem('user');
    try {
      console.log("INICIOUUUUUU")
      const me = await api.get('/me');
      console.log(me.data)
      setUser(me.data)

      if (dataUser) {
        setUser(JSON.parse(me.data))
      }
    } catch (error) {
      router.replace('/')
    }
    setIsUserLoading(false);
  }

  return (
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
      inicialization
    }}>
      {children}
    </AuthContext.Provider>
  )
}
