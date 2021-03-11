import Item from 'components/Item'
export default function EvolutionChain({ data }) {
  return (
    <div className='f f-w'>
      {
        data?.map(i =>
          <Item data={i} key={i.id} />
        )
      }
    </div>
  )
}