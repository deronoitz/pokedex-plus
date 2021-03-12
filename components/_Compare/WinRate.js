import Status from 'components/_Details/Status'
import styles from './Compare.module.css'

export default function WinRate({ data: currentCompare }) {
  return (
    <div className='container'>
      <h3>Win Prediction</h3>
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
            <td>Status</td>
            {currentCompare.map(i => <td key={i.basic.id}><Status data={i.basic.stats} /></td>)}
          </tr>
          <tr>
            <td>Total status (before)</td>
            <td>525</td>
            <td>290</td>
          </tr>
          <tr>
            <td>Effects</td>
            <td>
              <h5 className={styles.name}>Meowth :</h5>
              <p>- venusaur attack become double</p>
              <p>- meowth attack become half</p>
            </td>
            <td>
              <h5 className={styles.name}>Venusaur :</h5>
              <p>- venusaur attack become double</p>
              <p>- meowth attack become half</p>
            </td>
          </tr>
          <tr>
            <td>Total status (before)</td>
            <td>525</td>
            <td>290</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}