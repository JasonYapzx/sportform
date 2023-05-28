import Image from 'next/image'
import { Inter } from 'next/font/google'
import { initFirebase } from '@/firebase/config'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

export default function Home() {
  
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    router.push("/home");
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  }

  return (
    <div className="text-center flex flex-col gap-4 items-center">
      <div>Pleace Sign in to continue</div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={signIn}>
          <div className="bg-red-600 text white rounded-md p2 w-48">
            Sign In
          </div>
        </button>
      </div>
    </div>
  )
}
