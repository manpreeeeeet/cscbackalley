import { Login } from "./Login.tsx";

export function Navbar() {
  return (
    <div className="w-full border-b flex justify-between py-1">
      <div className="flex">
        <div>
          <a href="/">cscbackalley.club</a>
        </div>
        <div className="flex mx-2 gap-1">
          [<a href="/rumors">r |</a>
          <a href="/projects">p |</a>
          <a href="/rumors">g </a>]
        </div>
      </div>
      <div className="mx-2">
        <Login />
      </div>
    </div>
  );
}
