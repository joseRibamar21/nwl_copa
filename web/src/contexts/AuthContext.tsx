import { createContext, ReactNode, useState } from "react";
import UserI from "../@types/user";

import { api } from "../services/api";



export interface AuthContextDataProps {
  user: UserI;
  isUserLoading: boolean;
  singIn: (email: string, password: string) => Promise<void>;
  refreshUser: ()=>void
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserI>({} as UserI)
  const [isUserLoading, setIsUserLoading] = useState(false)

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

  function refreshUser(){
    const dataUser = sessionStorage.getItem('user');
    if(dataUser)
    setUser(JSON.parse(dataUser))
  }

  return (
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}
