import Link from 'next/link'
import CompareContext from 'hooks/compare'
import { useRouter } from 'next/router'
import styles from './Layout.module.css'

export default function Header() {
  const { compareDataCount } = CompareContext.useContainer()
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
              <a className={isActive('/compare') ? styles.activeMenu : ''}>
                Compare
                {compareDataCount > 0 && ` (${compareDataCount})`}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}