import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div>
        <DashboardLayout children={children} />
      </div>
    </PrivateRoute>
  );
}
