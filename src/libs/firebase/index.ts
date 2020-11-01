import * as firebase from 'firebase/app';
import 'firebase/auth';
import { config } from './config';

try {
  firebase.initializeApp(config);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
