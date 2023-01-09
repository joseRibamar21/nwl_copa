import Image from "next/image";
import Input from "../components/Input";
import { useState } from "react";
import ElevatedButton from "../components/ElevatedButton";
import Divider from "../components/Divider";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [dataForm, setDataForm] = useState({
    user: "",
    password: ""
  })
  const router = useRouter()

  const onChangeInput = (e: { target: { name: string; value: string; }; }) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  return (
    <>
    <Head>
      <title>Corretor Digital</title>
    </Head>
      <div className="px-[18%] pt-[5%]">
        <div className="flex flex-col items-center justify-around bg-primary w-100% py-10 gap-10 ">
          <h1 className="text-3xl font-bold text-white">Corretor Digital</h1>
          <div className="flex flex-row flex-wrap items-center justify-around w-[100%]">
            <Image src="/assets/logo_1.png" width={316} height={289} alt="logo1" className="w-[316px] h-[289px]" />
            <div className="flex flex-col gap-3 w-64">
              <Input id="user"
                label="Usuário"
                themeType="DARK"
                value={dataForm.user}
                onChange={onChangeInput}
                type="text" />
              <Input id="password"
                label="Senha"
                themeType="DARK"
                value={dataForm.password}
                onChange={onChangeInput}
                type="password" />
              <div className="flex flex-col pt-4 gap-5 ">
                <ElevatedButton onClick={()=>{
                  router.push('/home')
                }} themeType="ORANGE">Entrar</ElevatedButton>
                <Divider themeType="WHITE" />
                <a href="" className="text-white italic">Não tem conta?</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-5 pt-10">
          <Image src="/assets/logo_pege.png" alt="logo_pege" width={104} height={65} className="w-[104px] h-[65px]" />
          <Image src="/assets/logo_infatec.png" alt="logo_pege" width={190} height={66} className="w-[190px] h-[66px]" />
        </div>
      </div>
    </>
  )
}
