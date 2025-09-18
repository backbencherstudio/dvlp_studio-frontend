// app/student-portal/page.tsx
import { redirect } from "next/navigation";

export default function StudentPortalPage() {
  redirect("/student-portal/bookings");
}
