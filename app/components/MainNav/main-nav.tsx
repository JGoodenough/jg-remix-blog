import cx from "classnames";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import HamburgerIcon from "../HamburgerIcon/hamburger-icon";
import NavLogo from "../NavLogo/nav-logo";

type NavLink = {
  to: string;
  label: string;
};

enum MenuVisibility {
  VISIBILE = "block",
  HIDDEN = "hidden",
}

export const navLinks: Array<NavLink> = [
  {
    to: "",
    label: "Home",
  },
  {
    to: "/posts",
    label: "Blog",
  },
  {
    to: "",
    label: "About",
  },
  {
    to: "",
    label: "Contact Us",
  },
];

type MainNavProps = {
  navItems: Array<NavLink>;
};

const MainNav: FC<MainNavProps> = ({ navItems = navLinks }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex w-full flex-wrap items-center justify-between bg-white py-4 px-4 text-lg text-gray-700 md:py-0">
      <NavLogo />
      <HamburgerIcon
        handleClick={handleHamburgerClick}
        isOpen={isMobileMenuOpen}
      />
      <div
        className={cx("w-full md:flex md:w-auto md:items-center", {
          [MenuVisibility.VISIBILE]: isMobileMenuOpen,
          [MenuVisibility.HIDDEN]: !isMobileMenuOpen,
        })}
        id="menu"
      >
        <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
          {navItems?.map((navItem, index) => (
            <li key={index}>
              <Link
                className="block py-2 hover:text-green-600 md:p-4"
                to={navItem.to}
              >
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
