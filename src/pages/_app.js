import "../styles/globals.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ShellLayout from "@/components/ShellLayout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const marketingRoutes = ["/", "/managers"];
  const isMarketing = marketingRoutes.includes(router.pathname);

  if (isMarketing) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
