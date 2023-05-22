import { collection } from 'firebase/firestore'
import { db } from './firebase'

const usersCollectionRef = collection(db, 'users')
const cateCollectionRef = collection(db, 'categories')
const prodCollectionRef = collection(db, 'product')

export { prodCollectionRef, usersCollectionRef, cateCollectionRef }
