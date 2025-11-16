import "@/styles/globals.css";
import "@/lib/polyfills/safeRepeat";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}