import EditPenIcon from "@/components/icons/EditPenIcon";
import { Delete, PencilLineIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import TeamModal, { TeamFormData } from "./TeamModal";
import { useTeamMembers, useTeamsMutations } from "./useTeam";
import { useBlogMutations } from "./useBlog";
import DeleteConfirmModal from "./BlogDeleteConfirm";
import { toast } from "sonner";

export interface TeamMemberType {
  id: string | number;
  name: string;
  imageUrl: string;
  designation: string;
  description: string;
}

const fakeTeamMembers: TeamMemberType[] = [];

export default function TeamMember() {
  const { data: tdata, isLoading, isError } = useTeamMembers();
  const { addTeamMember, deleteTeamMember, deleteMutation } =
    useTeamsMutations();
  console.log("Tdata", tdata);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentMember, setCurrentMember] = useState<TeamMemberType | null>(
    null
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);

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

  const handleDelete = (member: TeamMemberType) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete?.id) return;
    deleteMutation.mutate(memberToDelete?.id.toString(), {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        setMemberToDelete(null);
      },
    });
  };

  const handleSubmit = async (data: TeamFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }
    // send it backend
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    await addTeamMember(formData);
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
          {tdata?.teams.map((member: any) => (
            <div
              key={member.id}
              className="pb-8 rounded-xl max-w-[298px] space-y-8 border overflow-hidden"
            >
              {/* img */}
              <div className="h-[211px] w-full overflow-hidden bg-red-300  relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />

                <button
                  onClick={() => handleDelete(member)}
                  className=" flex justify-center items-center gap-2.5 absolute border border-gray-300 [background:#FFF] px-4 py-1.5 rounded-[99px] border-solid right-[17.67px] top-[17px] cursor-pointer"
                >
                  <Delete className="w-4 h-4 " />{" "}
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    Delete
                  </span>
                </button>
                {/* <button
                  onClick={() => handleEditMember(member)}
                  className=" flex justify-center items-center gap-2.5 absolute border border-gray-300 [background:#FFF] px-4 py-1.5 rounded-[99px] border-solid right-[17.67px] top-[17px] cursor-pointer"
                >
                  <EditPenIcon className="w-4 h-4 " />{" "}
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    Edit
                  </span>
                </button> */}
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

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        team={memberToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}
