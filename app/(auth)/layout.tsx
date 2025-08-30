export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen mx-auto shrink-0 [background:linear-gradient(135deg,#312E81_0%,#581C87_50%,#831843_100%),#FFF] relative">
      {/* children layer */}
      <main className="w-full relative border z-[10] min-h-screen flex items-center justify-center ">
        {children}
      </main>

      {/* blobs layer */}
      <div className="w-[15vw] h-[15vw] [background:rgba(20,184,166,0.20)] blur-[32px] rounded-full absolute left-[40px] top-[80px] z-0" />
      <div className="w-[31.25vw] h-[31.25vw] [background:linear-gradient(90deg,rgba(20,184,166,0.10)_0%,rgba(6,182,212,0.10)_100%)] blur-[32px] rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0" />
      <div className="w-[20vw] h-[20vw] [background:rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute right-[40px] bottom-[80px] z-0" />
    </div>
  );
}
