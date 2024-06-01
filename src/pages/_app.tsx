import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";

const font = Inter({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
          font-family: ${font.style.fontFamily};
        }
        :root {
          --font-sans: ${font.style.fontFamily};
        }
      `}</style>
      <ThemeProvider forcedTheme="dark" attribute="class">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
