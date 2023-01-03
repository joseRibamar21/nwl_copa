import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import ElevatedButton from "../../components/ElevatedButton";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { singIn } = useAuth()
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  })

  const onChangeInput = (e: { target: { name: string; value: string; }; }) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  async function handleClickLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await singIn(dataForm.email,dataForm.password)
    } catch (e) {
      console.log(e) 
    }
  }

  return (
    <>
    <Head>
      <title>Bolão</title>
    </Head>
    <div className="flex flex-col justify-center h-[100vh] items-center">
        <form action="" onSubmit={handleClickLogin} className="flex flex-col">
          <h1 className="text-4xl font-bold pb-10">Tiro Certo</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={dataForm.email}
            name='email'
            onChange={onChangeInput}
            placeholder="Email"
            className="border-solid border-gray-700 border-2 p-1"
            />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={dataForm.password}
            name='password'
            onChange={onChangeInput}
            placeholder="Senha" 
            className="border-solid border-gray-700 border-2 p-1"
            />
          <div className="w-[100%]  pt-9">
            <ElevatedButton onClick={() => onChangeInput} >Login</ElevatedButton>
          </div>
        </form>
    </div>
    </>
  )
}
