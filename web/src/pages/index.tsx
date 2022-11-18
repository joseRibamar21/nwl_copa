import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import ElevatedButton from "../components/ElevatedButton";
import { useAuth } from "../hooks/useAuth";

export default function Home() {

  const { singIn } = useAuth()
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  })

  const onChangeInput = (e: { target: { name: string; value: string; }; }) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });


  async function handleClickLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      singIn(dataForm.email,dataForm.password)
    } catch (e) {
      console.log(e) 
    }
  }

  return (

    <>
    <Head>
      <title>Bolão</title>
    </Head>
    <div className="flex justify-center h-[100vh] items-center">
      <Image src='/ball_bg.jpg' alt="Background" width={906} height={512} className={"w-[100%] h-[100vh] object-cover absolute"} />
      <div className="relative flex h-[70vh] w-[100%] max-w-[600px] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60  bg-gray-900 shadow-2xl mx-10">
        <form action="" onSubmit={handleClickLogin} className="flex flex-col w-[100%] justify-center items-center px-[10%]">
          <h1 className="text-4xl font-bold pb-10">Tiro Certo</h1>
          <input type="text"
            value={dataForm.email}
            name='email'
            onChange={onChangeInput}
            placeholder="Email" className="h-8 rounded-sm mx-10 text-white bg-slate-800 p-3 w-[100%]" />
          <input type="password"
            value={dataForm.password}
            name='password'
            onChange={onChangeInput}
            placeholder="Senha" className="h-8 rounded-sm mx-10 text-white bg-slate-800 p-3 m-2 w-[100%]" />
          <div className="w-[100%]  pt-9">
            <ElevatedButton onClick={e => onChangeInput} >Login</ElevatedButton>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
