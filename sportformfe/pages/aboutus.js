import React from 'react';

import { initFirebase } from '@/firebase/config'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from 'next/router';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function AboutUs() {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (user) {
    router.push("/dashboard");
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  }

  return (
    <>
      <Header handleChild={signIn} ></Header>
        <div className='h-screen justify-center text-center p-52'>
          Please do the about us page here.
        </div>    
      <Footer />
    </>
  )
}