import { privateAxios } from "@/lib/axios";

export const createSession = async (data: any) => {
  const res = await privateAxios.post("/teacher/create-session", data);
  return res.data;
};

export const getTeacherSessions = async () => {
  const res = await privateAxios.get(`/teacher/my-sessions/`);
  return res.data;
};

// update session
export const updateSession = async (data: any, id: string) => {
  const res = await privateAxios.put(`/teacher/update-session/${id}`, data);
  return res.data;
};
