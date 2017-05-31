import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
  apiKey: "AIzaSyAn04oG-WxLMFRRx38rV58A6GEpSnYvBjg",
  authDomain: "split-that-bill-94a38.firebaseapp.com",
  databaseURL: "https://split-that-bill-94a38.firebaseio.com",
  projectId: "split-that-bill-94a38",
  storageBucket: "split-that-bill-94a38.appspot.com",
  messagingSenderId: "372760952070"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebase.auth());
export const authConfig = {
        // Url to redirect to after a successful sign-in.
        'signInSuccessUrl': '/menu',
        'callbacks': {
          'signInSuccess': function(user, credential, redirectUrl) {
            console.log("sign in success");
            console.log(user);
            console.log(credential);
            console.log(redirectUrl);
            return false; 
          }
        },
        'signInOptions': [
          // TODO(developer): Remove the providers you don't need for your app.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': 'https://www.google.com'
      };
