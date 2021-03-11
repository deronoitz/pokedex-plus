import Layout from 'components/Layout'
import Details from 'components/_Details'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function PokemonDetails(){
  const router = useRouter()
  const { query } = router
  useEffect(() => {
    document.title = `${query.name} | Pokédex Plus`
  })
  return (
    <Layout>
      <Details />
    </Layout>
  )
}