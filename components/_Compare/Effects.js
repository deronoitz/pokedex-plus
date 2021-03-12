import styles from './Compare.module.css'
export default function Effects({ data }) {
  return (
    <>
      {
        data.map((i, index) =>
          <td key={index}>
            {
              data.filter(j => j !== i).map(j =>
                <div>
                  <h5 className={styles.name}>{j.basic.name} :</h5>
                  {
                    i.weakness.filter(k => j.basic.types.filter(l => l.type.name === k).length > 0).length > 0 ?
                    <p>{j.basic.name} attack will double</p> : <p>No effect</p>
                  }
                </div>
              )
            }
          </td>
        )
      }
    </>
  )
}