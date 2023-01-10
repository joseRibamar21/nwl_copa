interface DropdawnProps {
  id: string;
  list: {
    id: number,
    value: string,
  }[];
}

export default function Dropdawn({id, list}: DropdawnProps){
  const lista = [{id: 0, value: "SELECIONE UMA "+ id.toUpperCase()},...list]
  return <select name={id} id={id} className='bg-gray-200 rounded p-1 w-max-[300px]'>
    {lista.map(e=>{
      return <option key={e.id} value={e.value} className='w-max-[300px]'>{e.value}</option>
    })}
  </select>
}
