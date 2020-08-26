import React, { useState, useEffect } from 'react';
import firebase from '../../services/firebase';


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)

        // Get user info from cloud store by uid
        const userRef = firebase.firestore().collection(`users`).doc(user.uid)
        userRef.get().then(doc => {
          if (doc.exists) {
            setUserInfo(doc.data())
          }
        })
      }
    });
  }, [currentUser])


  return (
    <AuthContext.Provider
      value={
        {
          currentUser,
          userInfo,
          setCurrentUser,
          setUserInfo
        }
      }
    >
      { children }
    </AuthContext.Provider>
  )
}