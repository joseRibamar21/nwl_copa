import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import cx from "classnames";
import { useRouter } from "next/router";
import { User } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ElevatedButton from "./ElevatedButton";


interface Props {}

const HoverCard = (props: Props) => {
  const router = useRouter()
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
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger className="flex justify-center items-center rounded-full w-14 h-14 bg-slate-800">
       <User size={32}/>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        align="center"
        sideOffset={4}
        className={cx(
          " radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-50",
          "max-w-md rounded-lg p-4 md:w-full",
          "bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60  bg-gray-900 shadow-2xl" ,
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <HoverCardPrimitive.Arrow className="fill-current text-gray-800 " />

        <div className="flex h-full w-full space-x-4">
         <div className="flex flex-col items-center p-3 max-w-[320px]">
         <form action="" onSubmit={handleClickLogin} className="flex flex-col w-[100%] justify-center items-center px-[10%]">
          <h3>Login</h3>
         <input type="text"
            value={dataForm.email}
            name='email'
            onChange={onChangeInput}
            placeholder="Email" className="h-8 rounded-sm  text-white bg-slate-800 p-3 w-[100%]" />
          <input type="password"
            value={dataForm.password}
            name='password'
            onChange={onChangeInput}
            placeholder="Senha" className="h-8 rounded-sm  text-white bg-slate-800 p-3 m-2 w-[100%]" />
          <div className="w-[100%]  pt-9">
            <ElevatedButton onClick={e => handleClickLogin} >Login</ElevatedButton>
          </div>
          </form>
         </div>
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export default HoverCard;
