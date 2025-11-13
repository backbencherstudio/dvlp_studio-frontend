import clsx from "clsx";

interface StatusBadgeProps {
  status: number | string;
}

export  default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 1 || status === "active";

  return (
    <p
      className={clsx(
        "border rounded-md flex items-center justify-center text-xs px-2 py-[2px] font-medium",
        isActive
          ? "bg-green-100 text-green-700 border-green-300"
          : "bg-red-100 text-red-700 border-red-300"
      )}
    >
      {isActive ? "Active" : "Deactive"}
    </p>
  );
}