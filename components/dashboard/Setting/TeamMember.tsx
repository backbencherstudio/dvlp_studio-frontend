import EditPenIcon from "@/components/icons/EditPenIcon";
import { PencilLineIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import TeamModal, { TeamFormData } from "./TeamModal";

export interface TeamMemberType {
  id: string | number;
  name: string;
  imageUrl: string;
  designation: string;
  description: string;
}

const fakeTeamMembers: TeamMemberType[] = [
  {
    id: 2,
    name: "Miyad Rahman",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    designation: "UI/UX Designer",
    description:
      "Passionate about creating clean, user-centered interfaces with Figma and Adobe.",
  },
  {
    id: 3,
    name: "Esha Islam",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    designation: "Project Manager",
    description:
      "Ensures smooth communication between clients and the development team with .",
  },
  {
    id: 4,
    name: "Ridwan Ahmed",
    imageUrl: "https://randomuser.me/api/portraits/women/41.jpg",
    designation: "Backend Developer",
    description:
      "Expert in Node.js, Express, and database design for scalable, secure systems.",
  },
  {
    id: 5,
    name: "Akash Chowdhury",
    imageUrl: "https://randomuser.me/api/portraits/women/47.jpg",
    designation: "QA Engineer",
    description:
      "Responsible for maintaining product quality with manual and automated testing tools.",
  },
];

export default function TeamMember() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentMember, setCurrentMember] = useState<TeamMemberType | null>(
    null
  );

  const handleAddMember = () => {
    setMode("add");
    setCurrentMember(null);
    setModalOpen(true);
  };

  const handleEditMember = (member: TeamMemberType) => {
    setMode("edit");
    setCurrentMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentMember(null);
    setModalOpen(false);
  };

  const handleSubmit = (data: TeamFormData) => {
    // send it backend
    console.log(data);

    // finally close modal
    handleCloseModal();
  };

  const modalKey = isModalOpen
    ? `${mode}-${currentMember?.id ?? "new"}`
    : undefined;

  return (
    <>
      <div className="bg-white px-8 py-6 rounded-lg max-w-[992px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Team Members
          </h2>

          <button
            onClick={handleAddMember}
            className="bg-gradient-to-l to-[#6366F1] from-[#A855F7] text-white font-semibold px-3 py-2 rounded-lg cursor-pointer"
          >
            + Add Member
          </button>
        </div>

        {/* all members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fakeTeamMembers.map((member) => (
            <div
              key={member.id}
              className="pb-8 rounded-xl max-w-[298px] space-y-8 border overflow-hidden"
            >
              {/* img */}
              <div className="h-[211px] w-full overflow-hidden bg-red-300  relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  // width={100}
                  // height={100}
                />

                <button
                  onClick={() => handleEditMember(member)}
                  className=" flex justify-center items-center gap-2.5 absolute border border-gray-300 [background:#FFF] px-4 py-1.5 rounded-[99px] border-solid right-[17.67px] top-[17px] cursor-pointer"
                >
                  <EditPenIcon className="w-4 h-4 " />{" "}
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    Edit
                  </span>
                </button>
              </div>
              {/* info */}
              <div className="text-center">
                <h2 className="text-xl font-bold leading-8 mb-1.5">
                  {member.name}
                </h2>
                <p className="text-sm font-semibold leading-6 mb-4 text-[#6366F1]">
                  {member.designation}
                </p>
                <p className="text-sm leading-[26px] text-[#4B5563]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <TeamModal
        key={modalKey}
        isOpen={isModalOpen}
        mode={mode}
        member={currentMember}
        onClose={handleCloseModal}
        onSave={handleSubmit}
      />
    </>
  );
}
