import dynamic  from 'next/dynamic'
import {useRouter} from "next/router";
const ShareEditor = dynamic(
  () => import('components/private/Editor/ShareEditor'),
  {ssr: false}
)

export default function Editor() {

  console.log(useRouter())

  return <ShareEditor />
}
