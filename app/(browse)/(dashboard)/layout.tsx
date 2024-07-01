import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";

interface CreatorLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: CreatorLayoutProps) => {
  const containerStyle = {
    maxHeight: `calc(100vh - 58px)`,
  };

  return (
    <>
      <Navbar />
      <div className="flex h-full mt-[58px]" style={containerStyle}>
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default DashboardLayout;
