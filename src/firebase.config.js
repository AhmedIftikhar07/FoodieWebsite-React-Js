import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBFWpfG-pMlZ2on3JwM-eCUQ_46blewFKs",
    authDomain: "foodieweb-react-js.firebaseapp.com",
    databaseURL: "https://foodieweb-react-js-default-rtdb.firebaseio.com",
    projectId: "foodieweb-react-js",
    storageBucket: "foodieweb-react-js.appspot.com",
    messagingSenderId: "956299388114",
    appId: "1:956299388114:web:632ac0a6c4f3968207b90b"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};