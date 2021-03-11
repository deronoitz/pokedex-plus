import styles from './Item.module.css'
import Link from 'next/link'
export default function Item({ data }) {
  return (
    <Link href={`/${data?.name}`}>
      <div className={styles.item}>
        <img
          src={data?.sprites.other?.['official-artwork']?.front_default}
          className={styles.artwork}
        />
        <div className={styles.content}>
          <p className='info'>
            #{('00' + data?.id).slice(-3)}
          </p>
          <p className={styles.title}>
            {data?.name}
          </p>
          <div className={`f f-w ${styles.tagWrapper}`}>
            {
              data?.types.map((i, index) =>
                <div
                  key={index}
                  className={`tag ${i.type?.name}`}
                >
                  {i.type?.name}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Link>
  )
}