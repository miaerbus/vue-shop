import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCUHxi_2U93ybDtOR4iF5YxtJQbSGrscSU',
  authDomain: 'vue-shop-16f0b.firebaseapp.com',
  databaseURL: 'https://vue-shop-16f0b.firebaseio.com',
  projectId: 'vue-shop-16f0b',
  storageBucket: 'vue-shop-16f0b.appspot.com',
  messagingSenderId: '1074758046902',
  appId: '1:1074758046902:web:f679dcd11e927cf83d0217',
  measurementId: 'G-JE1SKQX4TE'
}

export const fb = firebase.initializeApp(firebaseConfig)
