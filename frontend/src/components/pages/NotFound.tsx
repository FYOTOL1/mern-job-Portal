import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col w-full h-screen font-bold">
        <h1 className="text-6xl uppercase">
          Not <span className="text-[#F83002] text-7xl">404</span> Found
        </h1>

        <Link
          to="/"
          className="text-2xl mt-4 underline transition-all hover:text-gray-800"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default NotFound;
