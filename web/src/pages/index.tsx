import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function Home() {
  const router = useRouter()

  function handleToLogin(){
    const { ['nextauth.token']: token } = parseCookies()
    if(token){
      router.push('/rooms')
    }else{
      router.push('/login')
    }
  }

  return (
    <>
      <div className='flex flex-col p-4'>
      <h1>Bem Vindo ao Tiro Certo</h1>
      <button onClick={()=>handleToLogin()}>Login</button>
      </div>
    </>
  )
}
