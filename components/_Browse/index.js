import Item from 'components/Item'
export default function Browse({ data }) {
  return (
    <div className='container'>
      <div className='f f-w'>
        {data.map(i => <Item key={i.id} data={i} />)}
      </div>
    </div>
  )
}