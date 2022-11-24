import { useRouter } from "next/router";

import { DetailedHTMLProps, HTMLAttributes } from "react"

interface TextButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

const TextButton = (props: TextButtonProps) => {

  return (
    <div {...props} className="flex gap-2 items-center w-[100%] cursor-pointer hover:brightness-75 transition hover:bg-gray-700 active:bg-gray-600 rounded p-1 ">
      {props.children}
    </div>
  )
}

export default TextButton
