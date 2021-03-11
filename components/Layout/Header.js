import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Layout.module.css'

export default function Header() {
  const router = useRouter()
  const { asPath } = router
  const isActive = path => {
    return asPath.startsWith(path)
  }
  return (
    <div className={styles.header}>
      <div className='container'>
        <div className='f f-btw mdl'>
          <div>
            <Link href='/'>
              <a>
                <img src='/images/logo.webp' alt='Pokedex logo' className={styles.logo} />
              </a>
            </Link>
          </div>

          <div className={styles.menu}>
            <Link href='/'>
              <a className={isActive('/') ? styles.activeMenu : ''}>Browse</a>
            </Link>
            <Link href='/compare'>
              <a className={isActive('/compare') ? styles.activeMenu : ''}>Compare</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}