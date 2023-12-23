import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="h-screen text-center flex-col flex items-center justify-center bg-primary">
      <div>
        <img
          src="/404.svg"
          className="w-auto h-72 md:h-[30rem] mx-auto"
          alt="mutiple-projects-image"
        />

        <button
          onClick={() => navigate(-1)}
          className="bg-secondary/70 mt-4 shadow-lg px-4 md:px-8 py-2 md:py-3 rounded-lg text-white"
        >
          {" "}
          <span className="text-xs md:text-base flex items-center justify-center gap-x-3">
            <IoMdArrowBack /> Back
          </span>
        </button>
      </div>
    </div>
  );
}

