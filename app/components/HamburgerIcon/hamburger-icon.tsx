import type { FC } from "react";

type HamburgerIconProps = {
  handleClick: () => void;
  isOpen: boolean;
};

const HamburgerIcon: FC<HamburgerIconProps> = ({ handleClick, isOpen }) => {
  return isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
      onClick={handleClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      xmlns="<http://www.w3.org/2000/svg>"
      id="menu-button"
      className="block h-6 w-6 cursor-pointer md:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={handleClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default HamburgerIcon;
