import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'
import { useRouter } from 'next/router'
import { useState } from 'react'
import getDescription from 'modules/details/getDescription'
import getEvolution from 'modules/details/getEvolution'
import getWeakness from 'modules/details/getWeakness'
import Link from 'next/link'
import Status from './Status'
import EvolutionChain from './EvolutionChain'
import Description from './Description'
import styles from './Details.module.css'

export default function Details() {
  const [data, setData] = useState({})
  const router = useRouter()
  const { query } = router;
  const PokemonSWR = Pokemon__Get.swr(`${query.name}`, {
    onSuccess: async res => {
      // GET DESCRIPTION
      const description = await getDescription(res.species?.url)

      // GET WEAKNESS
      const weakness = await getWeakness(res.types)

      // GET EVOLUTION
      const evolution_data = await getEvolution(res.species?.url)

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
  const abilityText = data?.basic?.abilities.map(i => i.ability.name).join(', ')
  return (
    <div className='container'>
      <Link href='/'>
        <a className={styles.back}>
          <ArrowLeftOutlined style={{ marginRight: 12 }} />
          Back to browse
        </a>
      </Link>
      <div className='f f-btw mdl'>
        <h2 className={styles.name}>
          <span className={styles.id}>#{('00' + data?.basic?.id).slice(-3)}</span>
          <span>
            {data?.basic?.name}
          </span>
        </h2>
        <button className='btn'>
          <PlusOutlined />
          Add to compare
        </button>
      </div>
      <div className='f f-start'>
        <img
          src={data?.basic?.sprites.other?.['official-artwork']?.front_default}
          className={styles.artwork}
        />
        <div className={styles.content}>
          <Description data={data?.description} />

          <div className={styles.item}>
            <h5 className={styles.labell}>Types</h5>
            <div className={`f f-w`}>
              {data?.basic?.types.map((i, index) =>
                <div key={index} className={`tag ${i.type?.name}`}>
                  {i.type?.name}
                </div>
              )}
            </div>
          </div>

          <div className={styles.item}>
            <h5 className={styles.labell}>Weakness</h5>
            <div className={`f f-w`}>
              {data?.weakness?.map((i, index) =>
                <div key={index} className={`tag ${i}`}>
                  {i}
                </div>
              )}
            </div>
          </div>

          <div className={styles.item}>
            <h5 className={styles.labell}>Height</h5>
            <p>{data?.basic?.height}</p>
          </div>
          <div className={styles.item}>
            <h5 className={styles.labell}>Weight</h5>
            <p>{data?.basic?.weight}</p>
          </div>
          <div className={styles.item}>
            <h5 className={styles.labell}>Abilities</h5>
            <p>{abilityText}</p>
          </div>
          <div className={styles.item}>
            <h5 className={styles.labell}>Stats</h5>
            <Status data={data?.basic?.stats} />
          </div>
        </div>
      </div>

      <div>
        <h3>Evolution Chain</h3>
        <EvolutionChain data={data?.evolution_data} />
      </div>
    </div>
  )
}