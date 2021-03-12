import styles from './Compare.module.css'

export default function Rates({ data }) {
  const sumStat = arr => arr.map(k => k.base_stat).reduce((a, b) => a + b)
  const sumStatUp = arr => arr.map(k => k.base_stat).reduce((a, b) => a + b) + arr[1].base_stat
  let shaped = data.map(i => {
    return data.filter(j => j !== i).map(j => {
      const enemyAttackUp = i.weakness.filter(k => j.basic.types.filter(l => l.type.name === k).length > 0).length > 0
      const currentAttackUp = i.basic.types.filter(k => j.weakness.filter(l => l === k.type.name).length > 0).length > 0
      const current = currentAttackUp ? sumStatUp(i.basic.stats) : sumStat(i.basic.stats)
      const enemy = enemyAttackUp ? sumStatUp(j.basic.stats) : sumStat(j.basic.stats)
      const sum = current + enemy
      const out = {
        title: i.basic.name + ' vs ' + j.basic.name,
        currentName: i.basic.name,
        enemyName: j.basic.name,
        current,
        enemy,
        currentPercentage: Math.round(current / sum * 100),
        enemyPercentage: Math.round(enemy / sum * 100),
      }
      return out
    })
  })
  console.log(shaped)
  return (
    <>
      {
        shaped.map((i, index) =>
          <td key={index}>
            {
              i.map((j, index) =>
                <div key={index}>
                  <h5 className={styles.name}>{j.title}</h5>
                  {j.current} vs {j.enemy}
                  <br />
                  {j.currentPercentage}% vs {j.enemyPercentage}%
                  <br />
                  {j.current > j.enemy ? `${j.currentName} WIN` : `${j.enemyName} WIN`}
                </div>
              )
            }
          </td>
        )
      }
    </>
  )
}