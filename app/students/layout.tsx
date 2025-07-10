import ProtectedLayout from "@/components/auth/ProtectedLayout";
import NavBar from "@/components/shared/Navbar";


export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <div className="flex flex-col gap-4">
        <NavBar />
        {children}
      </div>
    </ProtectedLayout>
  );
}
