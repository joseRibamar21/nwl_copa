import { Spinner } from "phosphor-react";

export default function LoadPage() {
  return <div className="flex w-[100%] h-[100vh] justify-center items-center">
    <div className="animate-spin">
      <Spinner size={30} />
    </div>
  </div>
}
