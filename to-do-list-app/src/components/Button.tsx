import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: ButtonProps) {
  const classes = twMerge(
    classNames(
      "flex items-center justify-center px-3 py-1.5 border",
      {
        "opacity-80": loading,
        "border-blue-500 bg-blue-500 text-white": primary,
        "border-gray-900 bg-gray-900 text-white": secondary,
        "border-green-500 bg-green-500 text-white": success,
        "border-yellow-400 bg-yellow-400 text-white": warning,
        "border-red-500 bg-red-500 text-white": danger,
        "rounded-full": rounded,
        "bg-white text-white": outline,
        "text-blue-500": outline && primary,
        "text-gray-900": outline && secondary,
        "text-green-500": outline && success,
        "text-yellow-400": outline && warning,
        "text-red-500": outline && danger,
      },
      rest.className
    )
  );

  return (
    <button {...rest} className={classes} disabled={loading}>
      {children}
    </button>
  );
}

// Fix the prop validation logic
Button.propTypes = {
  checkVariationValue: ({
    primary,
    secondary,
    success,
    warning,
    danger,
  }: ButtonProps) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      throw new Error("Only one of the types can be true!");
    }
  },
};

export default Button;
