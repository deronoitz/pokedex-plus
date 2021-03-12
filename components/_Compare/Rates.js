import styles from './Compare.module.css'

export default function Rates({ data }) {
  const sumStat = arr => arr.map(k => k.base_stat).reduce((a, b) => a + b)
  const sumStatUp = arr => arr.map(k => k.base_stat).reduce((a, b) => a + b) + arr[1].base_stat
  return (
    <>
      {
        data.map((i, index) =>
          <td key={index}>
            {
              data.filter(j => j !== i).map(j =>
                <div>
                  <h5 className={styles.name}>{i.basic.name} vs {j.basic.name}</h5>
                  {
                    i.weakness.filter(k => j.basic.types.filter(l => l.type.name === k).length > 0).length > 0 ?
                      <>
                        <p>
                          {sumStat(i.basic.stats)} : {sumStatUp(j.basic.stats)}
                        </p>
                        <h4 className={styles.name}>
                          {Math.round((sumStat(i.basic.stats) / (sumStat(i.basic.stats) + sumStatUp(j.basic.stats))) * 100)}%
                          vs&nbsp;
                          {Math.round((sumStatUp(j.basic.stats) / (sumStat(i.basic.stats) + sumStatUp(j.basic.stats))) * 100)}%
                        </h4>
                      </>
                      :
                      <>
                        <p>
                          {sumStat(i.basic.stats)} : {sumStat(j.basic.stats)}
                        </p>
                        <h4 className={styles.name}>
                          {Math.round((sumStat(i.basic.stats) / (sumStat(i.basic.stats) + sumStat(j.basic.stats))) * 100)}%
                          vs&nbsp;
                          {Math.round((sumStat(j.basic.stats) / (sumStat(i.basic.stats) + sumStat(j.basic.stats))) * 100)}%
                        </h4>
                      </>
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