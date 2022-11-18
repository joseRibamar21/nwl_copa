import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react"

interface ElevatedButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    handleClick?: Function
    disable?: boolean
    theme?: "PRYMARY" | "SECUNDARY"
}

const ElevatedButton = ({ children, handleClick, disable = false, theme = "PRYMARY", ...props }: ElevatedButtonProps) => {
    let bg  = "bg-primary";

    if(theme === "SECUNDARY"){
      bg = "bg-blue-700";
    }

    return (
        <button {...props} className={`
        ${disable ? "bg-gray-400 cursor-default  shadow  " :  `${bg} hover:brightness-95 active:brightness-90`} 
        flex flex-row font-semibold justify-center items-center gap-5 rounded-xl px-3 py-1 w-[100%] text-textLight shadow-xl h-10`
        }>
            {children}
        </button>
    )
}

export default ElevatedButton
