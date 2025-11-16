"use client";

import { useEffect, useState } from "react";
import { EditTutorProfile } from "@/components/pages/TutorPortal/EditTutorProfile";
import { privateAxios } from "@/lib/axios";

interface Props {
  params: { tid: string };
}

const getProfileInfo = async (id: string) => {
  const res = await privateAxios.get(`/teacher/get/${id}`);
  return res.data;
};

export default function Page({ params }: Props) {
  const id = params.tid;

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfileInfo(id);
        setProfile(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  console.log(profile)
  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Failed to load tutor profile.</div>;

  const initialFormData = {
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    country: profile.country,
    city: profile.city,
    aboutMe: profile.about_me,
    gradesTaught: profile.grades_taught || [],
    certifications: profile.certifications || [],
    image: profile.avatar_url,
  };

  return (
    <div>
      <EditTutorProfile initialData={initialFormData} />
    </div>
  );
}
