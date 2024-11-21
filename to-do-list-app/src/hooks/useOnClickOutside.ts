import { useEffect } from "react";

interface OnClickOutsideProps<T extends HTMLElement> {
  ref: React.RefObject<T>;
  handler: (event: MouseEvent | TouchEvent) => void;
}
function useOnClickOutside<T extends HTMLElement>({
  ref,
  handler,
}: OnClickOutsideProps<T>): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
export default useOnClickOutside;
