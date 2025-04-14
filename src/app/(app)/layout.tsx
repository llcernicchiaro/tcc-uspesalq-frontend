import MobileNav from "@/components/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16">
      {children}
      <MobileNav />
    </div>
  );
}
