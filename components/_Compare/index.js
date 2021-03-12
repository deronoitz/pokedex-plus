import CompareContext from 'hooks/compare'
import Table from './Table'
import Empty from './Empty'
import WinRate from './WinRate'
import { useEffect, useState } from 'react'
export default function Compare() {
  const { compareDataCount } = CompareContext.useContainer()
  const [currentCompare, setCurrentCompare] = useState([])
  const ISSERVER = typeof window === "undefined";
  const getCompareData = () => {
    if (!ISSERVER) {
      let compareData = localStorage.getItem('compareData')
      compareData = JSON.parse(compareData) || []
      console.log(compareData)
      setCurrentCompare(compareData)
    }
  }

  useEffect(() => {
    getCompareData()
  }, [compareDataCount])


  return (
    <>
      {currentCompare.length > 0 && <Table data={currentCompare} />}
      {currentCompare.length > 0 && <WinRate data={currentCompare}/>}
      {currentCompare.length === 0 && <Empty />}
    </>
  )
}