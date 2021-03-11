import { createContainer } from 'unstated-next'
import { useState } from 'react'

const Context = createContainer((initialState = 0) => {
  const [compareDataCount, setCompareDataCount] = useState(initialState)
  return {
    compareDataCount, setCompareDataCount
  }
})

export default Context