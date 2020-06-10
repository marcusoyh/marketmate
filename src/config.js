/* eslint-disable prettier/prettier */
import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyA--gW5Ir6G8loC1efMiuwv47L8iu1LUE4',
  authDomain: 'marketmate-1e35f.firebaseapp.com',
  databaseURL: 'https://marketmate-1e35f.firebaseio.com',
  projectId: 'marketmate-1e35f',
  storageBucket: 'marketmate-1e35f.appspot.com',
  messagingSenderId: '528046010819',
};
let app = Firebase.initializeApp(config);
export const db = app.database();
