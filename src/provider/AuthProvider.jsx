/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  // console.log(loading, user);
  useEffect(() => {
    AOS.init({ duration: 1500, easing: "ease-in-out" });
  }, []);


  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    signInWithGoogle,
    email,
    setEmail,
    updateUserProfile
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      //jwt related
      if (currentUser?.email) {
        const user = { email: currentUser.email }

        axios.post(`http://localhost:5000/jwt`, user, {
          withCredentials: true
        })
          .then(res => {
            console.log('login token', res.data)
            setLoading(false)
          })
          .catch(err => console.log('error generating token', err))
      }
      // when the user logs out, the currentUser becomes null, remove the token.
      else {
        axios.post(`http://localhost:5000/logout`, {}, {
          withCredentials: true,
        })
          .then(res => {
            console.log('logout', res.data)
            setLoading(false);
          })
          .catch(err => console.log('error generating token', err))
      }


    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export default AuthProvider;