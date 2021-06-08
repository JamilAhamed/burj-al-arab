import React, { useContext } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);

            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
            const storeAuthToken =() =>{
                firebase.auth().currentUser.getIdToken(true)
                .then(function(idToken){
                    sessionStorage.setItem('token', idToken);
                }).catch(function(error){

                });
            }
    }
    return (
        <div className="btnStyle align-items-center">
            <h1>This is Login Page</h1>
            <button onClick={handleGoogleSignIn}>Sign in With Google</button>
        </div>
    );
};

export default Login;