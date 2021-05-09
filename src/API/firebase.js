import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyB_Xl4uD7tAVGuxyCht4Y_4rpFNcXw9Q2M",
        authDomain: "todo-app-adazolhub.firebaseapp.com",
        projectId: "todo-app-adazolhub",
        storageBucket: "todo-app-adazolhub.appspot.com",
        messagingSenderId: "416074723720",
        appId: "1:416074723720:web:6db9e14b07a5f95eb30a3d",
        measurementId: "G-XDC7RS6GXN"
});

const db = firebaseApp.firestore();

export default  db ;