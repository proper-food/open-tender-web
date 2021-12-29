import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

import { Account } from '..'

const Home = () => {
  const history = useHistory()
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth) history.push('/order-type')
  }, [history, auth])

  return auth ? <Account /> : null
}

Home.displayName = 'Home'
export default Home
