import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBMx3fiIxhf8JJJx10Zx2kXuIwBHYQqvG8',
  authDomain: 'oneup-1123b8b.firebaseapp.com',
  databaseURL: 'https://oneup-1123b8b-default-rtdb.firebaseio.com/',
  projectId: 'oneup-1123b8b',
  storageBucket: 'gs://oneup-1123b8b.appspot.com',
  messagingSenderId: '767606765314',
  appId: '1:767606765314:android:8fc26d0c5749f08a4ff41b',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export { firebase };