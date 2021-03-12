import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Status from './Status'
import EvolutionChain from './EvolutionChain'
import Description from './Description'
import CompareContext from 'hooks/compare'
import styles from './Details.module.css'

export default function Details({ data }) {
  const { setCompareDataCount } = CompareContext.useContainer()
  const abilityText = data?.basic?.abilities.map(i => i.ability.name).join(', ')
  const router = useRouter()
  const handleAddToCompare = () => {
    let current = localStorage.getItem('compareData')
    current = JSON.parse(current) || []
    try {
      if (current.length === 0) {
        localStorage.setItem('compareData', JSON.stringify([data]))
        setCompareDataCount(1)
      } else {
        const uniq = current.filter(i => i.basic.id !== data.basic.id);
        const output = [...uniq, data]
        setCompareDataCount(output.length)
        localStorage.setItem('compareData', JSON.stringify(output))
      }
      window.alert(`${data.basic.name} added to compare list`)
    } catch {
      console.log('Failed add to compare')
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='container'>
      <a className={styles.back} onClick={() => handleBack()}>
        <ArrowLeftOutlined style={{ marginRight: 12 }} />
        Back to browse
      </a>
      <div className='f f-btw mdl'>
        <h2 className={styles.name}>
          <span className={styles.id}>#{('00' + data?.basic?.id).slice(-3)}</span>
          <span>
            {data?.basic?.name}
          </span>
        </h2>
        <button className='btn' onClick={() => handleAddToCompare()}>
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
            <p>{data?.basic?.height * 10} cm</p>
          </div>
          <div className={styles.item}>
            <h5 className={styles.labell}>Weight</h5>
            <p>{data?.basic?.weight / 10} kg</p>
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