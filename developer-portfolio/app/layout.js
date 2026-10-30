import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ConstellationCanvas from "./components/helper/constellation-canvas";
import ScrollProgress from "./components/helper/scroll-progress";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nikhil Mundhra | Machine Learning Researcher & AI Systems Engineer",
  description:
    "Portfolio of Nikhil Mundhra - Machine Learning Researcher at NYU Abu Dhabi Center for Brain and Health, specializing in 3D biomedical imaging, distributed HPC training, and autonomous AI systems.",
  icons: {
    icon: "/profile.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ScrollProgress />
        <ConstellationCanvas />
        <ToastContainer />
        <Navbar />
        <main className="min-h-screen relative z-10 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
