import Item from 'components/Item'
import Filter from './Filter'
export default function Browse({ data }) {
  return (
    <div className='container'>
      <Filter />
      <div className='f f-w'>
        {data.map(i => <Item key={i.id} data={i} />)}
      </div>
    </div>
  )
}