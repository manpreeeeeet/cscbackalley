import { Login } from "./Login.tsx";
import { Link } from "react-router";

export function Navbar() {
  return (
    <div className="w-full border-b flex justify-between py-1">
      <div className="flex">
        <div>
          <Link to="/">cscbackalley.club</Link>
        </div>
        <div className="flex mx-2 gap-1">
          [<Link to="/rumors">r |</Link>
          <Link to="/projects">p |</Link>
          <Link to="/spam">s</Link>]
        </div>
      </div>
      <div className="mx-2">
        <Login />
      </div>
    </div>
  );
}
