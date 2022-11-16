import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: React.ReactNode
    handleClick?: Function
    disable?: boolean
}

const Input = ({ children, handleClick, disable = false, ...props }: InputProps) => {

    return (
        <input {...props} className={`
        ${disable ? "bg-gray-400 cursor-default  shadow  " : `bg-primary hover:brightness-95 active:brightness-90`} 
        rounded-xl px-3 py-1 w-[100%] text-textLight shadow-xl h-10`
        }>
            {children}
        </input>
    )
}

export default Input