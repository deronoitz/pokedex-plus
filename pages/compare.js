import { useEffect } from 'react'
import Layout from 'components/Layout'
import Compare from 'components/_Compare'

export default function ComparePage() {
  useEffect(() => {
    document.title = 'Compare | Pokédex Plus'
  })
  return (
    <Layout>
      <Compare />
    </Layout>
  )
}
