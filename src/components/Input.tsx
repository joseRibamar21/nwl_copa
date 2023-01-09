import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
  id?: string; 
  label?: string;
  type: HTMLInputTypeAttribute | undefined;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  themeType: "DARK" | "LIGHT" 
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-[100%]">
      <label htmlFor="user_login" className={`font-semibold ${props.themeType == "LIGHT" ? "text-black": "text-white"}`}>{props.label}</label>
      <input id="user_login" 
        name={props.id}
        className="p-1 border-none border-white focus:border-none outline-none rounded-md w-[100%]" 
        type={props.type} 
        onChange={props.onChange}
      />
    </div>
  )
}
