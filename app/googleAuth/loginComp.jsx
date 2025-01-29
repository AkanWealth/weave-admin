"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Provider from "./Provider";

function LoginComp() {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [authProvider, setAuthProvider] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setAuthProvider(response);
    };

    setProviders();
  }, []);

  return (
    <div>
      {session ? (
        <>
          {session.user.name}
          {session.user.email}
          {JSON.stringify(session.user)}
          <button
            className="bg-weave-primary p-2 rounded-full"
            onClick={() => signOut()}
          >
            {" "}
            Signout
          </button>
        </>
      ) : (
        authProvider &&
        Object.values(authProvider).map((provider) => (
          <button
            key={provider.name}
            className="bg-weave-primary p-2 rounded-full"
            onClick={() => signIn(provider.id)}
          >
            {" "}
            Sign In with {provider.name}
          </button>
        ))
      )}
    </div>
  );
}

export default function () {
  return (
    <Provider>
      <LoginComp />
    </Provider>
  );
}
