import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { Lato, Noticia_Text, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const noticiaText = Noticia_Text({
  variable: "--font-noticia-text",
  subsets: ["latin"],
  style: "italic",
  weight: ["400", "700"],
});

export const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

import CookieConsent from "@/components/CookieConsent";
import "@/styles/globals.css";
import "@splidejs/react-splide/css";
import clsx from "clsx";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "react-day-picker/dist/style.css";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useLiveEvents } from "@/hooks/useLiveEvents";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useLiveEvents();
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered:", reg.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("Notification permission granted.");
        }
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main
        id="main"
        className={clsx(
          lato.variable,
          noticiaText.variable,
          oswald.variable,
          "font-sans"
        )}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <SpeedInsights />
        <Analytics />
        <Component {...pageProps} />
        <CookieConsent />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
      <ProgressBar
        height="3px"
        color="#00985F"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
}
