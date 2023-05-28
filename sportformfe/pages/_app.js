import '@/styles/globals.css'

import { initFirebase } from '@/firebase/config'


export default function App({ Component, pageProps }) {
  const app = initFirebase();
  return <Component {...pageProps} />
}
