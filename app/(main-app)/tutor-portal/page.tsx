// app/student-portal/page.tsx
import { redirect } from "next/navigation";

export default function StudentPortalPage() {
  redirect("/tutor-portal/calender-stats");
}
