import { toast } from "react-toastify"
import Input from "../../../components/Input"
import ElevatedButton from "../../../components/ElevatedButton"
import CheckBox from "../../../components/Checkbox"
import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { newRoomService } from "../../../services/rooms_services"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies";

export default function NewRoom() {

  const [title, setTitle] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [check, setCheck] = useState<boolean>(true)

  const router = useRouter()

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
  };
  function onChangeUrlImage(e: React.FormEvent<HTMLInputElement>) {
    setUrlImage(e.currentTarget.value)
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const room = await newRoomService({title,urlImage,open:check});
      router.replace('/rooms/'+ room.id)
    } catch (error) {
      toast("Erro ao cadastrar sala!", { type: "error" })
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center content-center ">
        <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4 w-[100%] max-w-[600px]'>
          <h1>Criar Sala</h1>

          <Input
            type='text'
            placeholder='Nome da Sala'
            value={title}
            required
            onChange={onChange}
            className='w-[100%]' />

          <Input
            type='url'
            placeholder='Url para imagem'
            value={urlImage}
            required
            onChange={onChangeUrlImage}
            className='w-[100%]' />
          <div className='flex flex-row'>
            <div onClick={() => { setCheck(!check) }}>
              <CheckBox title='Sala Privada?' />
            </div>
          </div>

          <ElevatedButton onClick={e => handleSubmit}>
            Confirmar
          </ElevatedButton>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)
  
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
