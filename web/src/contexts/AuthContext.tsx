import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../@types/user";
import { setCookie, destroyCookie, parseCookies } from "nookies"
import { api } from "../services/api";
import Router from 'next/router'

export interface AuthContextDataProps {
  user: User | null;
  isUserLoading: boolean;
  refreshUser(): Promise<User | null>
  singIn: (email: string, password: string) => Promise<void>;
  singOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
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
      setCookie(undefined, 'nextauth.token', res.data.token, { maxAge: 24 * 60 * 60 * 5 })
      setCookie(undefined, 'nextauth.user', JSON.stringify(
        res.data.user
      ), { maxAge: 24 * 60 * 60 * 5 })
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user)
      Router.replace('/rooms')
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  function singOut() {
    try {
      destroyCookie(undefined, 'nextauth.token')
      destroyCookie(undefined, 'nextauth.user')
      Router.replace('/singOut')
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async function refreshUser() {
    setIsUserLoading(true)
    const res = await api.get('me')
    if (res.data.user) {
      const user = res.data.user as User
      setUser(user)
      setIsUserLoading(false)
      return user
    }
    setIsUserLoading(false)
    return null
  }

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies()
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { "nextauth.user": userData } = parseCookies()
      const objectUser = JSON.parse(userData)
      console.log(objectUser.user as User)
      setUser(objectUser)
      refreshUser()
    } else {
      Router.replace('/')
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      singIn,
      singOut,
      refreshUser,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
