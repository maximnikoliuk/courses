import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { User } from "firebase/auth";

type ContextProps = {
  user: User | null;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });
  }, [auth.currentUser]);

  return (
      <AuthContext.Provider value={{ user }}>
        { children }
      </AuthContext.Provider>
  );
};
