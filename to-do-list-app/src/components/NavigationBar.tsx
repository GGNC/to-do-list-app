import { useQueryClient } from "@tanstack/react-query";
import { UserInterface } from "../api/types";
import AppLogo from "../assets/logos/app-logo.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import useWindowSize from "../hooks/useWindowSize";

function NavigationBar() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserInterface>(["user"]);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const handleLogout = async () => {
    queryClient.clear();
    navigate("/");
  };
  return (
    <div className="w-full mt-2 flex justify-between items-center ">
      <div className="mt-2 mx-4  flex justify-center items-center">
        <div className="w-14 h-14 bg-[#228be6] border-slate-200 border-2 rounded-full shadow-2xl shadow-gray-600 flex justify-center items-center">
          <img className="w-10" src={AppLogo} alt="App Logo" />
        </div>
        <p className="cursor-default text-2xl mx-2 font-semibold text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {user?.firstName}
          {"'s"}
        </p>
        <span className="cursor-default text-2xl font-extrabold text-transparent bg-gradient-to-r from-[#fa5252] to-[#fd7e14] bg-clip-text drop-shadow-none">
          Taskpad
        </span>
      </div>
      <Button
        danger
        rounded
        className={`mt-2 mx-4 border-4 h-12 border-slate-200 ring-2 ring-red-700 shadow-2xl hover:ring-4 hover:ring-red-500 hover:shadow-3xl transition-all
          ${windowSize.width <= 500 ? "w-12" : "w-28"}`}
        onClick={handleLogout}
      >
        {windowSize.width <= 500 ? <FaPowerOff color="#fff" /> : "Log out"}
      </Button>
    </div>
  );
}
export default NavigationBar;
