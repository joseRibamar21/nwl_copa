import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import { ListPools } from "../../../components/ListPools"

export default function meRooms(){
  return (<>
    <Head>
        <title>Bolão</title>
      </Head>
      <div>
        Minhas Salas
        {/* <ListPools list={mePools} title='Meus Bolões' isMe={true} refresh={()=>{loadPools()}}/> */}
      </div>
  </>)
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
