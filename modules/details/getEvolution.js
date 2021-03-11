import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'

const getEvolution = async url => {
  const species = await fetch(url).then(res => res.json())
  const evolution = await fetch(species?.evolution_chain?.url).then(res => res.json())
  // recursive function to get evo chains name
  const getChain = data => {
    let chain = []
    if (data?.evolves_to?.length > 0) {
      chain = [
        ...chain,
        {
          name: data.species.name
        },
        ...getChain(data.evolves_to[0])
      ]
    } else {
      chain = [
        ...chain,
        {
          name: data.species.name
        }
      ]
    }
    return chain
  }

  const chain = getChain(evolution.chain)
  const evolution_data = await Promise.all(
    chain?.map(async data => {
      const response = await Pokemon__Get.fetcher(`/${data.name}`)
      return response
    })
  )
  return evolution_data
}

export default getEvolution