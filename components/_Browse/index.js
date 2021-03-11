import Item from 'components/Item'
import { useState } from 'react'
import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'
import qs from 'query-string'
export default function Browse() {
  const [data, setData] = useState([])
  const PokemonListSWR = Pokemon__Get.swr('?' + qs.stringify({
    limit: 48,
    offset: 0
  }), {
    onSuccess: async res => {
      const pokemons = await Promise.all(
        res.results.map(async data => {
          const response = await fetch(data.url)
          const pokemon = await response.json()
          return pokemon
        })
      )
      setData(pokemons)
    }
  })
  return (
    <div className='container'>
      <div>
        <button className='btn'>Filter</button>
      </div>
      {
        !PokemonListSWR.data &&
        'Loading...'
      }
      <div className='f f-w'>
        {data.map(i => <Item key={i.id} data={i} />)}
      </div>
    </div>
  )
}