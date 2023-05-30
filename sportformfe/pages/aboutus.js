import React from "react";

import { initFirebase } from "@/firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
  };

  return (
    <>
      <Header handleChild={signIn}></Header>
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-20 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
              About <span class="text-teal-400">Sportform</span>
            </h1>
            <p className="mb-4 text-gray-600 text-lg">
              Sportform is built by 4 software developers who share a
              deep-rooted passion for sports. As avid athletes ourselves, we have
              experienced firsthand the frustrations of trying to perfect our
              form and the lack of accessible resources that provide accurate
              feedback.
            </p>
            <p className="mb-4 text-gray-600 text-lg">
              Driven by this passion, we decided to build Sportform, a platform
              that empowers athletes and fitness enthusiasts alike. Using
              state-of-the-art Computer Vision and Pose Estimation technologies,
              Sportform evaluates the fitness videos you upload, providing
              detailed feedback on your form and competency.
            </p>
            <p className="mb-4 text-gray-600 text-lg">
              Together, let us revolutionize the way we approach fitness, one
              video at a time. Welcome to Sportform, where your journey to
              excellence begins!
            </p>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
            <img
              className="rounded-lg w-80 md:ml-1 ml-28"
              alt="Workout"
              src="/workout.jpg"
            ></img>
          </div>
        </div>
      </section>
      <section className="mx-auto">
        <div className="flex flex-col w-full mt-4 mb-4 text-left lg:text-center">
          <h1 className="mb-8 text-5xl font-bold text-black">Our Team</h1>
        </div>
        <div className="grid grid-cols-2 gap-16 mb-16 ml-16 mr-16 text-center lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/eiffel.jpg"
              alt="Eiffel"
              className="rounded-lg block object-contain h-50 greyC"
            ></img>
            <p className="mt-4 text-4xl font-extrabold text-gray-700">Eiffel</p>
            <p className="text-gray-400">Software Developer</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/jason.jpg"
              alt="Jason"
              className="rounded-lg block object-contain h-50 greyC"
            ></img>
            <p className="mt-4 text-4xl font-extrabold text-gray-700">Jason</p>
            <p className="text-gray-400">Software Developer</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/javon.jpg"
              alt="Javon"
              className="rounded-lg block object-contain h-50 greyC"
            ></img>
            <p className="mt-4 text-4xl font-extrabold text-gray-700">Javon</p>
            <p className="text-gray-400">Software Developer</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/jeric.jpg"
              alt="Jeric"
              className="rounded-lg block object-contain h-50 greyC"
            ></img>
            <p className="mt-4 text-4xl font-extrabold text-gray-700">Jeric</p>
            <p className="text-gray-400">Software Developer</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
