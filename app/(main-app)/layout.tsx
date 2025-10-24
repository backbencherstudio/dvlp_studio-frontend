import Footer from "@/components/common/Footer";
import Navbar from "@/components/pages/Home/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className=" min-h-[calc(100vh-310px)]">{children}</div>
      <Footer />
    </div>
  );
}
