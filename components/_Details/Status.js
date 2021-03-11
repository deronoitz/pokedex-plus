export default function Status({ data }) {
  const shaped = data?.map(i => ({
    name: i.stat.name.split('-').join(' '),
    value: i.base_stat
  }))
  const MAX_VALUE = 250
  return (
    <>
      {
        shaped?.map((stat, index) =>
          <div className='stat-wrapper' key={index}>
            <p style={{ marginBottom: 5 }}>{stat.name} ({stat.value})</p>
            <div className='stat-bar'>
              <span style={{ width: stat.value / MAX_VALUE * 100 + '%' }}></span>
            </div>
          </div>
        )
      }
    </>
  )
}