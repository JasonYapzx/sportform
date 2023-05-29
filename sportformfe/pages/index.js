import React from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Home() {
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
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-20 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
              Improve your form
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              Sportform is  free to use social sporting application, where you can connect
              with other sportmen, receive feedback about your form and even join live workouts!
            </p>
            <div className="flex justify-center">
              <Link
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="https://github.com/JasonYapzx/sportform"
              >
                <span className="justify-center">Find out more</span>
              </Link>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
            <img
              className="w-80 md:ml-1 ml-28"
              alt="Exercise"
              src="/exercise.jpg"
            ></img>
          </div>
        </div>
        
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
                Subscribe to our newsletter
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-600">
                Enter your email address and get our newsletters straight away.
              </h1>
              <input
                placeholder="jeric@sportform.com"
                name="email"
                type="email"
                autoComplete="email"
                className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
              ></input>{" "}
              <Link
                className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/"
              >
                <span className="justify-center">Subscribe</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
    <Footer />
    </>
  )
}
