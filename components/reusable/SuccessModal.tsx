"use client";

import Image from "next/image";
import Link from "next/link";
import CustomDialog from "@/components/reusable/CustomDialog";

interface SuccessModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
  backHref?: string; // optional, defaults to "/"
}

export default function SuccessModal({
  open,
  setOpen,
  title,
  message,
  backHref = "/",
}: SuccessModalProps) {
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center">
        {/* Success Icon */}
        <Image
          className="w-[137px] h-[72.377px]"
          width={150}
          height={75}
          src={"/others/success.svg"}
          alt="success"
        />

        {/* Dynamic Title */}
        <h2 className="text-center mb-2 text-xl font-semibold">{title}</h2>

        {/* Dynamic Message */}
        <p className="mb-9 max-w-[339px] mx-auto text-gray-400 text-center">
          {message}
        </p>

        {/* Back Button */}
        <div className="mt-4 flex justify-center">
          <Link className="text-[#A855F7] underline" href={backHref}>
            Back to Home
          </Link>
        </div>
      </div>
    </CustomDialog>
  );
}
