import classNames from "classnames";

interface SkeletonProps {
  amount: number;
  className?: string;
}
function Skeleton({ amount, className }: SkeletonProps) {
  const outerClassNames = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    "w-full h-14",
    className
  );
  const innerClassNames = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );
  const boxes = Array(amount)
    .fill(0)
    .map((_, index) => {
      return (
        <div key={index} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return boxes;
}

export default Skeleton;
