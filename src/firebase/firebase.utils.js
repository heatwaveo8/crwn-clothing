import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAJaWGOWDlGGud7hHEebijqZgrmMXSImXU',
    authDomain: 'crwn-db-6fc87.firebaseapp.com',
    projectId: 'crwn-db-6fc87',
    storageBucket: 'crwn-db-6fc87.appspot.com',
    messagingSenderId: '212460444686',
    appId: '1:212460444686:web:f706208784373ac576705f'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = doc(db, 'users', `${ userAuth.uid }`);

    const snapShot = await getDoc(userRef);
    
    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, { displayName, email, createdAt, ...additionalData });
        } catch (error) {
            console.error('error creating user', error.message);
        }
    }

    return userRef;
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider).catch(() => {});;

export default app;