import { useEffect } from 'react'
import Layout from 'components/Layout'
import Browse from 'components/_Browse'
export default function Home() {
  useEffect(() => {
    document.title = 'Browse | Pokédex Plus'
  })
  return (
    <Layout>
      <Browse />
    </Layout>
  )
}
