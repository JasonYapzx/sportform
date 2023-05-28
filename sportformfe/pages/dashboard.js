import React from "react";

import Navbar from "../components/NavBar";
import { useRouter } from 'next/router';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Page from "@/components/common/Page";


export default function Dashboard() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    router.push("/");
    return <div>Please sign in to continue</div>
  }

  
  return (
    <>
      <Page title="Dashboard">
        <main className="profile-page">
          
        </main>
      </Page>
    </>
  );
}