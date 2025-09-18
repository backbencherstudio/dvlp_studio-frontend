// app/student-portal/profile/[id]/edit/page.tsx
import { EditStudentProfile } from "@/components/pages/StudentPortal/EditStudentProfile";

interface Props {
  params: { id: string };
}

// 🚀 Later: Fetch real API
async function getProfile(id: string) {
  const res = await fetch(`${process.env.API_URL}/students/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export default async function Page({ params }: Props) {
  // ✅ Fake data for now
  const fakeProfile = {
    name: "Michael Thompson",
    role: "Student",
    image:"https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=2000",
    location: "New York, USA",
    about:
      "Michael has over 12 years of experience teaching physics and mathematics to high school and college students. He specializes in making complex concepts easy to understand and enjoys helping students achieve their academic goals.",
    sessionGrade: "High School (Grades 9—12)",
  };

  // 🔄 Later replace with:
  // const profile = await getProfile(params.id);

  return (
    <div className="">
      <EditStudentProfile initialData={fakeProfile} />
    </div>
  );
}
