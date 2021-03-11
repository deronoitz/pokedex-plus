import { fetcherWithParams } from 'modules/fetcher'
import { swrGet } from 'modules/swr'

const contract = {
  path: process.env.NEXT_PUBLIC_API_URL  + '/pokemon',
  method: 'get',
}

const fetcher = fetcherWithParams(contract)
const swr = (key, options) => swrGet(contract, fetcher, options, key)

export const Pokemon__Get = {
  contract,
  fetcher,
  swr
}
