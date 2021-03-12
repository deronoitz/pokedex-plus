import { useEffect, useState } from 'react'
import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'
import { useRouter } from 'next/router'
import getFiltered from 'modules/filter/getFiltered'
import Layout from 'components/Layout'
import Filter from 'components/_Browse/Filter'
import Browse from 'components/_Browse'
import qs from 'query-string'

export default function Home() {
  const [data, setData] = useState([])
  const router = useRouter()
  const { query } = router
  const page = query?.page * 1 || 1
  const [pageIndex, setPageIndex] = useState(page)
  const LOAD_PER_PAGE = 48
  let fetchQuery = {}
  if (query.filter) {
    fetchQuery = {
      limit: query.to - query.from + 1,
      offset: query.from - 1
    }
  } else {
    fetchQuery = {
      limit: LOAD_PER_PAGE,
      offset: (LOAD_PER_PAGE * pageIndex) - LOAD_PER_PAGE
    }
  }
  const PokemonListSWR = Pokemon__Get.swr('?' + qs.stringify(fetchQuery), {
    onSuccess: async res => {
      let pokemons = await Promise.all(
        res.results.map(async data => {
          const response = await fetch(data.url)
          const pokemon = await response.json()
          return pokemon
        })
      )
      if(query.filter){
        pokemons = await getFiltered(pokemons, query)
      }
      setData(pokemons)
    }
  })

  const handlePageIndex = index => {
    if (index !== 0) {
      router.push({
        query: {
          page: index
        }
      })
    }
  }

  useEffect(() => {
    document.title = 'Browse | Pokédex Plus'
  })

  useEffect(() => {
    setPageIndex(page)
    PokemonListSWR.revalidate()
  }, [page, query])
  return (
    <Layout>
      <Filter />
      {
        !PokemonListSWR.data &&
        <div className='container f f-ctr mdl' style={{ height: '70vh' }}>
          Getting pokemon data...
        </div>
      }
      {
        PokemonListSWR.data && data.length === 0 &&
        <div className='container f f-ctr mdl' style={{ height: '70vh' }}>
          Pokemon with current filter is not found
        </div>
      }
      {
        PokemonListSWR.data && data.length > 0 &&
        <>
          <Browse data={data} />
          {
            !query.filter &&
            <div className='f mdl f-ctr' style={{ margin: '20px 0' }}>
              <button onClick={() => handlePageIndex(pageIndex - 1)} className={`btn ${pageIndex === 1 ? 'disabled' : ''}`} style={{ marginRight: 10 }}>Previous</button>
              <button onClick={() => handlePageIndex(pageIndex + 1)} className='btn'>Next</button>
            </div>
          }
        </>
      }

    </Layout>
  )
}
