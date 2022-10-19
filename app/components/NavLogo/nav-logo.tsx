import cx from "classnames";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";

const NavLogo: FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleLogoMouseEnter = () => {
    setIsFocused(true);
  };

  const handleLogoMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <div
      className="flex cursor-pointer items-start justify-start"
      onMouseEnter={handleLogoMouseEnter}
      onMouseLeave={handleLogoMouseLeave}
    >
      <Link to="/">
        <span
          className={cx("text-1xl rounded-l-full  p-2 pl-4 ", {
            "bg-black text-green-600": isFocused,
            "bg-green-600 text-black": !isFocused,
          })}
        >
          Jesse
        </span>{" "}
        <span
          className={cx("text-1xl hover: rounded-r-full  p-2 pr-4 ", {
            "bg-green-600 text-black": isFocused,
            "bg-black text-green-600": !isFocused,
          })}
        >
          Goodenough
        </span>
      </Link>
    </div>
  );
};

export default NavLogo;
