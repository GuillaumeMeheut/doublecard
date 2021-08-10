import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/analytics'
import 'firebase/performance'

const clientCredentials = {
  apiKey: 'AIzaSyAJnHpYHW0vrQCDbfxDack6gYlmz8T1MWs',
  authDomain: 'double-card-72890.firebaseapp.com',
  databaseURL:
    'https://double-card-72890-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'double-card-72890',
  storageBucket: 'double-card-72890.appspot.com',
  messagingSenderId: '571396797609',
  appId: '1:571396797609:web:0384d3586e258e569c25b8',
  measurementId: 'G-LHPVXBH9ZR',
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)

  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in clientCredentials) {
      firebase.analytics()
      firebase.performance()
    }
  }
  console.log('Firebase initialized')
}

const Rdb = firebase.database()

export { Rdb }
