interface IconButtonProps {
  children: React.ReactNode,
  onclick: Function
}

export default function IconButton(props: IconButtonProps){
  return (
    <button onClick={()=>props.onclick()} className="bg-gray-200 rounded-full shadow active:shadow-none p-1">{props.children}</button>
  )
}
