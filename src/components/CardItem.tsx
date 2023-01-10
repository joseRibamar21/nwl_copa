import Image from "next/image";

interface CardItemProps{
  title: string,
  scr: string,
  onClick: Function
}

export default function CardItem(props: CardItemProps) {
  return (
    <div className="flex flex-col bg-gray-200 cursor-pointer active:shadow-none px-4 py-5 rounded-md shadow-md justify-center items-center gap-5">
      <div className="w-[82px] h-[82px]">
        <Image width={82} height={82} src={props.scr} alt="cadastrar_prova" />
      </div>
      <span className="font-medium">{props.title}</span>
    </div>
  )
}
