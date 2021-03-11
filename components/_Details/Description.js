import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'
import styles from './Details.module.css'
export default function Description({ data }) {
  const [selected, setSelected] = useState('red')
  const shaped = data?.map(i => ({
    version: i.version.name,
    description: i.flavor_text
  }))
  const selectedText = shaped?.filter(i => i.version === selected) || []
  return (
    <>
      <div className='f f-btw mdl'>
        <h5 className={styles.label}>Description</h5>
        <div className='select'>
          <select value={selected} onChange={e => setSelected(e.target.value)}>
            {
              shaped?.map(i => <option key={i.version} value={i.version}>{i.version}</option>)
            }
          </select>
          <DownOutlined className='arrow' />
        </div>
      </div>
      <p>{selectedText[0]?.description}</p>
    </>
  )
}