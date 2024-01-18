'useclient'
import { db } from 'app/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useQuery } from 'react-query'

const getOrderDetail = async orderId => {
  try {
    console.log('aaa', orderId)
    const orderRef = doc(db, 'orders', orderId)
    const orderSnap = await getDoc(orderRef)
    const orderData = orderSnap.data()
    let driverData = null
    if (!orderData) {
      return false
    }
    if (orderData.driverId) {
        const driverRef = doc(db, 'drivers', orderData.driverId)
        const driverSnap = await getDoc(driverRef)
        driverData = driverSnap.data()
        if (!driverData) {
            return false
        }
    }

    const userRef = doc(db, 'users', orderData.userId)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()
    if (!userData) {
      return false
    }
    return {
      ...orderData,
      user: userData,
      driver: driverData
    }
  } catch (error) {
    console.log(error)
  }
}

const useOrderDetail = orderId => {
  return useQuery(['order', orderId], () => getOrderDetail(orderId))
}

export default useOrderDetail
