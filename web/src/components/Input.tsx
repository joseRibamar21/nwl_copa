import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  theme?: "PRYMARY" | "SECUNDARY"
}

export default function Input(props: InputProps) {
  return (
    <input {...props}
      className="h-8 rounded text-white bg-slate-800 p-3 w-[100%] shadow-sm" />
  )
}

