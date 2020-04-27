import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    
        apiKey: "AIzaSyD781RG_b_QurntViW8b8TrpGVfBxiKH7M",
        authDomain: "crown-db-f17b8.firebaseapp.com",
        databaseURL: "https://crown-db-f17b8.firebaseio.com",
        projectId: "crown-db-f17b8",
        storageBucket: "crown-db-f17b8.appspot.com",
        messagingSenderId: "360986510304",
        appId: "1:360986510304:web:de2cbdd2c14b838d6de185",
        measurementId: "G-FX28ECYES9"
      };

      export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            })
          } catch (error){
            console.log('error creating user', error.message);
          }
        }

        return userRef;

      };

      export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);
        console.log(collectionRef);

        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          console.log(newDocRef);
          batch.set(newDocRef, obj);
        });

        return await batch.commit();
      };

      export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.doc.map(doc => {
          const { title, items } = doc.data();

          return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
          }
        });

       return transformedCollection.reduce((accumulator, collection) => {
         accumulator[collection.title.toLowerCase()] = collection;
         return accumulator;
       }, {});
      };

      firebase.initializeApp(config);


      export const auth = firebase.auth();
      export const firestore = firebase.firestore();

      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      export const signInWithGoogle = () => auth.signInWithPopup(provider);

      export default firebase;