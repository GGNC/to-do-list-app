import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}
function Modal({ children, onClose }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref, handler: () => onClose() });
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return ReactDOM.createPortal(
    <div>
      <div className="fixed  inset-0 bg-slate-200 opacity-60 "></div>
      <div
        ref={ref}
        className="fixed w-2/5 min-w-80 h-auto top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-5 bg-white rounded-3xl border-slate-200 border-4"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>,
    document.body.querySelector(".modal-container") || document.body
  );
}

export default Modal;
