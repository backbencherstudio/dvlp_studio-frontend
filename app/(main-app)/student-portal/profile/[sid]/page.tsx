// app/student-portal/profile/[id]/edit/page.tsx
import { EditStudentProfile } from "@/components/pages/StudentPortal/EditStudentProfile";
import { privateAxios } from "@/lib/axios";

interface Props {
  params: { sid: string };
}

const getProfileInfo = async (id: string) => {
  const res = await privateAxios.get(`students/${id}`);
  return res.data;
};

export default async function Page({ params }: Props) {
  // ✅ Fake data for now
  const fakeProfile = {
    firstname: "Michael ",
    lastname: "Thompson",
    role: "Student",
    image:
      "https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=2000",
    location: "New York, USA",
    about:
      "Michael has over 12 years of experience teaching physics and mathematics to high school and college students. He specializes in making complex concepts easy to understand and enjoys helping students achieve their academic goals.",
    sessionGrade: "High School (Grades 9—12)",
  };

  //   {
  //     "id": "cmhvitxjw0000vh4k0qnd73av",
  //     "first_name": "Bill",
  //     "last_name": "Jhon",
  //     "email": "y71x12uqxn@mkzaso.com",
  //     "avatar": "null",
  //     "country": null,
  //     "city": null,
  //     "grade_level": "grade_8",
  //     "about_me": null,
  //     "created_at": "2025-11-12T04:49:50.877Z",
  //     "totalBookedSessions": 2
  // }

  console.log("SID", params.sid);
  // 🔄 Later replace with:
  const res = await getProfileInfo(params.sid);
  console.log("Profile:", res.data);
  const data = res.data;
  const initifalProfileData = {
    firstname: data.first_name,
    lastname: data.last_name,
    role: "Student", // static unless API gives a role
    image: data.avatar === "null" ? null : data.avatar,
    location:
      data.country && data.city ? `${data.city}, ${data.country}` : "",
    about: data.about_me,
    sessionGrade: data.grade_level,
  };

  return (
    <div className="">
      <EditStudentProfile initialData={initifalProfileData} />
    </div>
  );
}
