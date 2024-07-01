import Image from "next/image";

interface AuthTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthTemplate = ({
  children,
  title,
  description,
}: AuthTemplateProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Image src="/prolite.svg" alt="logo" width="130" height="63" />
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-center">{title}</h1>
          <p className="lg:text-nowrap mt-3 mb-8">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};
