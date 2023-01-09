interface ElevatedButtonProps{
  children: React.ReactNode
  themeType: "ORANGE" | "BLUE"
  onClick: Function
}

export default function ElevatedButton(props: ElevatedButtonProps){
  return (
    <button onClick={()=>props.onClick()} className={`${props.themeType == "BLUE"? "bg-primary": "bg-secondary"} 
      rounded-xl px-3 py-1 w-[100%]
      hover:brightness-95 active:brightness-90 text-white`} >
      {props.children}
    </button>
  )
}
