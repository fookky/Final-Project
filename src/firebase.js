// เรียกใช้ module
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

// ค่า minimum configuration คือ `apiKey` และ `projectId`
const config = firebase.initializeApp({
    apiKey: "AIzaSyAlXp1VIWvflUZucRskxtlyUIy2oF8PJN4",
    authDomain: "kis-project.firebaseapp.com",
    databaseURL: "https://kis-project-default-rtdb.firebaseio.com",
    projectId: "kis-project",
    storageBucket: "kis-project.appspot.com",
    messagingSenderId: "129493824543",
    appId: "1:129493824543:web:5902aecea784d8d9bb512a",
    measurementId: "G-FMK0VQS2YW"
})

export default firebase.apps[0] || firebase.initializeApp(config)