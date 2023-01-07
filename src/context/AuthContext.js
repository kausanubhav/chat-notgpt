import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
//create a context called AuthContext
export const AuthContext = createContext();
//user data is gonna be used by many components
//that's why we are adding the state data to the context provider
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
   const unsub= onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
      console.log(user);
    });

    return ()=>{
      unsub();
    }
   
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
  );
};

