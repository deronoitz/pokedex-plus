import styles from './Compare.module.css'
import Status from 'components/_Details/Status'
import CompareContext from 'hooks/compare'
import { CloseOutlined } from '@ant-design/icons'

export default function CompareTable({ data: currentCompare }) {
  const { setCompareDataCount } = CompareContext.useContainer()

  const handleRemoveCompare = id => {
    let compareData = localStorage.getItem('compareData')
    compareData = JSON.parse(compareData) || []
    let output = compareData.filter(i => i.basic.id !== id)
    localStorage.setItem('compareData', JSON.stringify(output))
    setCompareDataCount(output.length)
  }
  return (
    <div className='container'>
      <h3>Comparing {currentCompare.length} Pokemon</h3>
      <div>
        {
          currentCompare.map(i =>
            <div key={i.basic.id} className='tag f mdl f-btw'>
              #{('00' + i.basic.id).slice(-3)} {i.basic.name}
              <button onClick={() => handleRemoveCompare(i.basic.id)}>
                <CloseOutlined />
              </button>
            </div>
          )
        }
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: 150 }}></th>
            {
              currentCompare.map(i =>
                <th key={i.basic.id}>
                  <img src={i.basic.sprites.other?.['official-artwork']?.front_default} className={styles.artwork} />
                  <h5 className={styles.name}>#{('00' + i.basic.id).slice(-3)} {i.basic.name}</h5>
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            {currentCompare.map(i => <td key={i.basic.id}>{i.basic.name}</td>)}
          </tr>

          <tr>
            <td>Code</td>
            {currentCompare.map(i => <td key={i.basic.id}>#{('00' + i.basic.id).slice(-3)}</td>)}
          </tr>
          <tr>
            <td>Description</td>
            {currentCompare.map(i => <td key={i.basic.id}>{i.description?.[0]?.flavor_text}</td>)}
          </tr>
          <tr>
            <td>Types</td>
            {
              currentCompare.map(i =>
                <td key={i.basic.id}>
                  <div className='f f-w'>
                    {
                      i.basic.types.map((n, index) =>
                        <div
                          key={index}
                          className={`tag ${n.type?.name}`}
                        >
                          {n.type?.name}
                        </div>
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <td>Weakness</td>
            {
              currentCompare.map(i =>
                <td key={i.basic.id}>
                  <div className='f f-w'>
                    {
                      i.weakness.map(n =>
                        <div key={n} className={`tag ${n}`}>
                          {n}
                        </div>
                      )
                    }
                  </div>
                </td>
              )
            }
          </tr>
          <tr>
            <td>Height</td>
            {currentCompare.map(i => <td key={i.basic.id}>{i.basic.height * 10} cm</td>)}
          </tr>
          <tr>
            <td>Weight</td>
            {currentCompare.map(i => <td key={i.basic.id}>{i.basic.weight / 10} kg</td>)}
          </tr>
          <tr>
            <td>Status</td>
            {currentCompare.map(i => <td key={i.basic.id}><Status data={i.basic.stats} /></td>)}
          </tr>
        </tbody>
      </table>
    </div>
  )
}