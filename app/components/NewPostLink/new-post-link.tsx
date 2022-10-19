import { Link } from "@remix-run/react";
import type { FC } from "react";

const NewPostLink: FC = () => {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
};

export default NewPostLink;
