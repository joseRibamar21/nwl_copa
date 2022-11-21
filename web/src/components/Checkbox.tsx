import * as Checkbox from '@radix-ui/react-checkbox';
import {Check} from 'phosphor-react'


interface CheckBoxProps{
  title: string
}

export default function CheckBox({title}:CheckBoxProps) {
  return (
    <div className='flex p-1 my-0 lg:items-center'>
      <Checkbox.Root 
      id="c1" 
    
      className="flex items-center justify-center w-6 h-6 bg-white border border-gray-600 rounded-md shadow opacity-95 focus:opacity-100" 
      >
        <Checkbox.Indicator className="">
          <Check size={16} color='#000'/>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="pl-3 text-lg  cursor-pointer select-none" htmlFor="c1">
        {title}
      </label>
    </div >
  )
}

