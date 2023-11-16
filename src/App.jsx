import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import Footer from "./components/footer"

export default function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

