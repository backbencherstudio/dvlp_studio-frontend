// app/student-portal/profile/[id]/edit/page.tsx
import { EditStudentProfile } from "@/components/pages/StudentPortal/EditStudentProfile";
import PasswordUpdate from "@/components/reusable/PasswordUpdate";
import { privateAxios } from "@/lib/axios";

interface Props {
  params: Promise<{ sid: string }>;
}
const getProfileInfo = async (id: string) => {
  const res = await privateAxios.get(`students/${id}`);
  return res.data;
};

export default async function Page({ params }: Props) {
  const { sid } = await params;

  const res = await getProfileInfo(sid);
  console.log("Res from ", res)
  const data = res.data;

  const initialProfileData = {
    firstname: data?.first_name,
    lastname: data?.last_name,
    role: "Student",
    image: data?.avatar === "null" ? null : data?.avatar,
    country: data?.country,
    city: data?.city,
    about: data?.about_me,
    sessionGrade: data?.grade_level,
  };

  return (
    <div>
      <>
      <EditStudentProfile initialData={initialProfileData} />
      <PasswordUpdate/>
      </>
    </div>
  );
}
