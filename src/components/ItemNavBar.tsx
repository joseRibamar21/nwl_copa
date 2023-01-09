interface ItemNavBarProps {
  title?: string;
}

export default function ItemNavBar(props: ItemNavBarProps) {
  return (
    <button className=" relative 
    text-white
    text-lg
    font-bold
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
    before:scale-x-[0]
    before:transition-transform
    before:ease-in-out
    hover:before:transition-transform
    hover:before:origin-left
    hover:before:scale-x-[1]">
      {props.title}
    </button>
  )
}
