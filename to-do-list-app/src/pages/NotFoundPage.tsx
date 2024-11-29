import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/logos/app-logo.svg";
import Button from "../components/Button";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen">
      <div className="container min-w-96 mx-auto flex flex-col flex-nowrap justify-start items-center">
        <div className="w-64 h-64 mt-20 m-1 bg-[#228be6] border-slate-200 border-2 rounded-full shadow-2xl shadow-gray-600 flex justify-center items-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-40 h-auto animate-scale"
          />
        </div>
        <p className="mt-2 text-8xl font-extrabold text-transparent bg-gradient-to-r from-[#fa5252] to-[#fd7e14] bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Oops!
        </p>
        <p className="text-xl font-semibold">404 - PAGE NOT FOUND</p>
        <p className="text-sm font-medium">
          The page you are looking for might have been removed
        </p>
        <p className="text-sm font-medium">
          had its name changed or is temporarily unavilable.
        </p>
        <Button
          className="m-4 px-8 h-14 flex justify-center items-center font-extrabold text-2xl border-4 border-slate-200 ring-4 ring-blue-700 shadow-2xl hover:ring-8 hover:ring-blue-500 hover:shadow-3xl transition-all"
          onClick={() => {
            navigate("/");
          }}
          primary
          rounded
        >
          GO TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}
export default NotFoundPage;
