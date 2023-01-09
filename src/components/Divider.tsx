interface DividerProps{
  themeType: "BLACK" | "WHITE"
}

export default function Divider(props: DividerProps){
  return (
    <div className={`${props.themeType == "WHITE"? "bg-gray-200": "bg-gray-900"} w-[100%] h-[1px] rounded`}/>
  )
}
