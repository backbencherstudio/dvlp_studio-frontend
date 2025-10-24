import StudentSidebar from "@/components/common/StudentSidebar";
import PortalHero from "@/components/reusable/PortalHero";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={["student"]}>
      <div className="">
        <PortalHero type="student" username="Sarah" notificationCount={0} />
        <div className=" [background:linear-gradient(135deg,#F8FAFC_0%,#EFF6FF_100%)]">
          <section className="max-w-[1216px] mx-auto flex flex-col md:flex-row gap-8  pt-16 pb-24 sm:px-0 px-4">
            <div className="">
              <StudentSidebar />
            </div>
            <main className="flex-1">{children}</main>
          </section>
        </div>
      </div>
    </PrivateRoute>
  );
}

