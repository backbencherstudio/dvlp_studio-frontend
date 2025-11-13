import CustomDialog from "@/components/reusable/CustomDialog";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const PaymentSuccessModal = ({ isSuccessModalOpen, setIsSuccessModalOpen }: any) => {
  return (
    <CustomDialog
      open={isSuccessModalOpen}
      setOpen={setIsSuccessModalOpen}
      width={true}
    >
      <div className=" flex flex-col items-center ">
        <Image
          className="w-[137px] h-[72.377px]"
          width={150}
          height={75}
          src={"./others/success.svg"}
          alt="success"
        />

        <h2 className="text-center  mb-2 text-xl font-semibold">
          Payment Successful
        </h2>
        <p className="mb-9 max-w-[339px] mx-auto text-gray-400  text-center">
          Your session with Dr. Jessica Miller has been successfully booked.
        </p>
        <div className="mt-4 flex justify-center">
          <Link className="text-[#A855F7] underline" href={"/"}>
            {" "}
            Back to Home{" "}
          </Link>
        </div>
      </div>
    </CustomDialog>
  );
};

export default PaymentSuccessModal;
