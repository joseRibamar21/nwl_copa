import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <Image src='/ball_bg.jpg' alt="Background" width={906} height={512} className={"w-[100%] h-[100vh] object-cover absolute"} />
      <div className="relative flex h-[70vh] w-[100%] max-w-[600px] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60  bg-gray-900 shadow-2xl mx-10">
        <form action="" className="flex flex-col w-[100%] justify-center items-center">
          <input type="text" placeholder="Email" className="h-8 rounded-sm mx-10 text-black"  />
          <input type="password" placeholder="Senha" className="h-8 rounded-sm mx-10 text-black "/>
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}
