// app/student-portal/profile/[id]/edit/page.tsx
import { EditStudentProfile } from "@/components/pages/StudentPortal/EditStudentProfile";
import { EditTutorProfile } from "@/components/pages/TutorPortal/EditTutorProfile";

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
  // const fakeProfile = {
  //   name: "Michael Thompson",
  //   role: "Student",
  //   image:"https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=2000",
  //   location: "New York, USA",
  //   about:
  //     "Michael has over 12 years of experience teaching physics and mathematics to high school and college students. He specializes in making complex concepts easy to understand and enjoys helping students achieve their academic goals.",
  //   sessionGrade: "High School (Grades 9—12)",
  // };

  const fakeProfile2 = {
    id: "cmfs20qyt0000uv0ssnlr92y0",
    first_name: "Elliot",
    last_name: " Kim",
    email: "sazzz@example.com",
    type: "teacher",
    avatar: "null",
    country: "Silver Lake, CA",
    city: "USA",
    grades_taught: [],
    about_me: "I am passionate about teaching and helping students excel in science and math.",
    created_at: "2025-09-20T09:16:32.261Z",
    certifications: [],
    avatar_url: "avatar/null",
    totalSessions: 0,
    totalEarnings: 0
  }


  // Transform the data for the form
  const initialFormData = {
    firstName: fakeProfile2.first_name,
    lastName: fakeProfile2.last_name,
    email: fakeProfile2.email,
    country: fakeProfile2.country,
    city: fakeProfile2.city,
    aboutMe: fakeProfile2.about_me,
    gradesTaught: fakeProfile2.grades_taught || [],
    certifications: fakeProfile2.certifications || [],
    image: fakeProfile2.avatar_url // This is the string URL for initial preview
  };


  // 🔄 Later replace with:
  // const profile = await getProfile(params.id);

  return (
    <div className="">
      <EditTutorProfile initialData={initialFormData} />
    </div>
  );
}
