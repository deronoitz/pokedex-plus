export default function Empty(){
  return (
    <div className='container f f-ctr mdl f-c' style={{height: '70vh'}}>
      <h3>No Pokemon has added to comparison list</h3>
      <p>{`Please add pokemon first by accessing Browse > Pokemon > Add to compare`}</p>
    </div>
  )
}