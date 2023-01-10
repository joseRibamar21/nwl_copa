import Link from "next/link";
import { useRouter } from "next/router";

interface ItemNavBarProps {
  routerName?: string;
  currentRouterName?: string;
  title?: string;
}

export default function ItemNavBar(props: ItemNavBarProps) {

  console.log(`${props.routerName} ${props.currentRouterName}`)
  return (
    <Link href={`${props.routerName}`} className={`relative 
    text-white
    text-lg
    font-bold
    flex justify-center items-center
    w-[100%]
    before:content-['']
    before:absolute 
    before:w-[100%] 
    before:h-[4px] 
    before:rounded 
    before:bg-secondary 
    before:bottom-3
    before:left-0
    before:origin-left
    before:${props.routerName != props.currentRouterName? "scale-x-[0]":"scale-x-[1]"}
    before:transition-transform
    before:ease-in-out
    hover:before:transition-transform
    hover:before:origin-left
    hover:before:scale-x-[1]`}
    >
      {props.title}
    </Link>
  )
}
