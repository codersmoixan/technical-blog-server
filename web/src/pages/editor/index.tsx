import dynamic  from 'next/dynamic'
const ShareEditor = dynamic(
  () => import('components/private/Editor/ShareEditor'),
  {ssr: false}
)

export default function Editor() {
  return <ShareEditor />
}
