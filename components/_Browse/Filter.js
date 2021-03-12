import { Type__Get } from 'contracts/type/get-type'
import { Ability__Get } from 'contracts/ability/get-ability'
import { Pokemon__Get } from 'contracts/pokemon/get-pokemon'
import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import qs from 'query-string'
import styles from './Browse.module.css'

export default function Filter() {
  const router = useRouter()
  const [typeData, setTypeData] = useState([])
  const [height, setHeight] = useState('all')
  const [weight, setWeight] = useState('all')
  const [ability, setAbility] = useState('all')
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(100)
  const TypeSWR = Type__Get.swr()
  const AbilitySWR = Ability__Get.swr(`?limit=400`)
  const PokemonSWR = Pokemon__Get.swr(`?limit=1`)
  const types = TypeSWR.data?.results || []
  const abilities = AbilitySWR.data?.results || []
  const pokemonCount = PokemonSWR.data?.count || 1

  const isChecked = (value, data) => data.filter(i => i === value).length > 0

  const handleSelectType = e => {
    const { value, checked } = e.target
    if (checked) {
      setTypeData(prev => [...prev, value])
    } else {
      setTypeData(typeData.filter(i => i !== value))
    }
  }

  const handleReset = () => {
    setTypeData([])
    setHeight('all')
    setWeight('all')
    setAbility('all')
    setFrom(1)
    setTo(100)
    router.push({
      query: ''
    })
  }

  const handleApply = () => {
    const data = {
      filter: true,
      type: typeData,
      height,
      weight,
      ability,
      from,
      to
    }
    router.push({
      query: qs.stringify(data)
    })
  }
  return (
    <div className={`container ${styles.filter}`}>
      <div className='f mdl f-btw' style={{ marginBottom: 20 }}>
        <h3>Browse Filter</h3>
      </div>
      <div className='f f-btw'>
        <div>
          <h5>Types</h5>
          {
            types.map(i =>
              <div key={i.name} className='f mdl'>
                <input type='checkbox' onChange={e => handleSelectType(e)} name='types' value={i.name} checked={isChecked(i.name, typeData)}/>
                <p>{i.name}</p>
              </div>
            )
          }
        </div>
        <div className='f f-c'>
          <div>
            <h5>Height</h5>
            <div className='f mdl'>
              <input type='radio' onChange={e => setHeight(e.target.value)} name='height' value='all' checked={'all' === height}/>
              <p>{`All`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setHeight(e.target.value)} name='height' value='short' checked={'short' === height}/>
              <p>{`Short (< 1 meter)`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setHeight(e.target.value)} name='height' value='medium' checked={'medium' === height}/>
              <p>{`Medium (< 1.5 meter)`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setHeight(e.target.value)} name='height' value='tall' checked={'tall' === height}/>
              <p>{`Tall (> 1.5 meter)`}</p>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <h5>Weight</h5>
            <div className='f mdl'>
              <input type='radio' onChange={e => setWeight(e.target.value)} name='weight' value='all' checked={'all' === weight}/>
              <p>{`All`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setWeight(e.target.value)} name='weight' value='light' checked={'light' === weight}/>
              <p>{`Light (< 10 kg)`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setWeight(e.target.value)} name='weight' value='medium' checked={'medium' === weight}/>
              <p>{`Medium (< 50 kg)`}</p>
            </div>
            <div className='f mdl'>
              <input type='radio' onChange={e => setWeight(e.target.value)} name='weight' value='heavy' checked={'heavy' === weight} />
              <p>{`Heavy (> 50 kg)`}</p>
            </div>
          </div>
        </div>
        <div>
          <h5>Abilities</h5>
          <div className='select'>
            <select onChange={e => setAbility(e.target.value)}>
              <option value='all'>All</option>
              {
                abilities.map((i, index) => <option key={index} value={i.name}>{i.name}</option>)
              }
            </select>
            <DownOutlined className='arrow' />
          </div>
        </div>

        <div>
          <h5>Number range</h5>
          <div>
            <input className='input' value={from} onChange={e => setFrom(e.target.value)} type='number' max={pokemonCount - 1} min={1} placeholder='From' style={{ width: 100 }} />
            <span style={{ margin: '0 10px' }}>-</span>
            <input className='input' value={to} onChange={e => setTo(e.target.value)} type='number' max={pokemonCount} min={2} placeholder='To' style={{ width: 100 }} />
          </div>
        </div>
      </div>

      <div className='f f-rht'>
        <button className='btn gray' onClick={() => handleReset()} style={{ marginRight: 12 }}>Reset</button>
        <button className='btn' onClick={() => handleApply()}>Apply</button>
      </div>
    </div>
  )
}