import DashboardLayout from "@/components/dashboard/DashboardLayout";



export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardLayout children={children} />
    </div>
  );
}
