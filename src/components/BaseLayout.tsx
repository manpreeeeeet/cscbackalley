import { Navbar } from "./Navbar.tsx";
import { Login } from "./Login.tsx";

export function BaseLayout({ children }) {
  return (
    <>
      <div className="bg-black text-white font-serif  min-h-screen">
        <Navbar />
        <div className="text-4xl mt-20 lg:max-w-screen-md mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}
