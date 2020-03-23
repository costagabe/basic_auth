import firebase from 'firebase'
export const firebaseConfig = {
  apiKey: 'AIzaSyBxTZote5cvZrB5aWbJTgQ8EqiXc4AbEXs',
  authDomain: 'systemcore-6e25e.firebaseapp.com',
  databaseURL: 'https://systemcore-6e25e.firebaseio.com',
  projectId: 'systemcore-6e25e',
  storageBucket: 'systemcore-6e25e.appspot.com',
  messagingSenderId: '757003414765',
  appId: '1:757003414765:web:1f032e1f9864994f3270e4',
  measurementId: 'G-SJ8X77DKRY'
}
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const userToken = async function getUser () {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => user ? user.getIdToken().then((payload) => resolve(payload)) : resolve(undefined))
  })
}
