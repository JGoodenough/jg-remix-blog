import { Link } from "@remix-run/react";
import type { FC } from "react";

const NavLogo: FC = () => {
  return (
    <div>
      <Link to="/">
        <span className="text-1xl">Jesse</span>{" "}
        <span className="text-1xl text-green-600">Goodenough</span>
      </Link>
    </div>
  );
};

export default NavLogo;
