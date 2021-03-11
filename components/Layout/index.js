import Header from './Header'
import CompareContext from 'hooks/compare'
export default function Layout({ children }) {
  const ISSERVER = typeof window === "undefined";
  let currentCompare = []
  if (!ISSERVER) {
    currentCompare = localStorage.getItem('compareData')
    currentCompare = JSON.parse(currentCompare) || []
  }
  return (
    <>
      <CompareContext.Provider initialState={currentCompare.length}>
        <Header />
        {children}
      </CompareContext.Provider>
    </>
  )
}