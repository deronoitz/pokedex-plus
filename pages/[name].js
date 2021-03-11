import Layout from 'components/Layout'
import Details from 'components/_Details'
import getDescription from 'modules/details/getDescription'
import getEvolution from 'modules/details/getEvolution'
import getWeakness from 'modules/details/getWeakness'
import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PokemonDetails() {
  const [data, setData] = useState({})
  const router = useRouter()
  const { query } = router
  const PokemonSWR = Pokemon__Get.swr(`${query.name}`, {
    onSuccess: async res => {      
      const description = await getDescription(res.species?.url) // GET DESCRIPTION
      const weakness = await getWeakness(res.types) // GET WEAKNESS
      const evolution_data = await getEvolution(res.species?.url) // GET EVOLUTION

      // GENERATE FINAL DATA
      const finalData = {
        basic: res,
        description,
        weakness,
        evolution_data
      }
      setData(finalData)
    }
  })
  const isEmpty = Object.keys(data).length === 0 && data.constructor === Object
  const error = PokemonSWR.error
  useEffect(() => {
    document.title = `${query.name} | Pokédex Plus`
  })

  return (
    <Layout>
      <div className='container f f-ctr mdl' style={{height: isEmpty ? '70vh' : ''}}>
        {isEmpty && error && 'Data not found'}
        {isEmpty && !error && 'Getting pokemon data...'}
      </div>
      {!isEmpty && <Details data={data} />}
    </Layout>
  )
}