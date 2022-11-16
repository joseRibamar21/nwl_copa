import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react"

interface ElevatedButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    handleClick?: Function
    disable?: boolean
}

const ElevatedButton = ({ children, handleClick, disable = false, ...props }: ElevatedButtonProps) => {

    return (
        <button {...props} className={`
        ${disable ? "bg-gray-400 cursor-default  shadow  " : `bg-primary hover:brightness-95 active:brightness-90`} 
        rounded-xl px-3 py-1 w-[100%] text-textLight shadow-xl h-10`
        }>
            {children}
        </button>
    )
}

export default ElevatedButton