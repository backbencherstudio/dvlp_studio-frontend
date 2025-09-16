import StudentSidebar from "@/components/common/StudentSidebar";
import PortalHero from "@/components/reusable/PortalHero";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <PortalHero type="student" username="Sarah" notificationCount={2} />
      <div className=" [background:linear-gradient(135deg,#F8FAFC_0%,#EFF6FF_100%)]">
        <section className="max-w-[1216px] mx-auto flex gap-8  pt-16 pb-24">
          <div className="">
            <StudentSidebar />
          </div>
          <main className="flex-1">{children}</main>
        </section>
      </div>
    </div>
  );
}
