import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface HeaderCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerItems?: React.ReactNode;
}

export const HeaderCard = ({
  title,
  children,
  className,
  headerItems,
}: HeaderCardProps) => {
  return (
    <Card className={cn("relative ", className)}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        {headerItems}
      </CardHeader>
      <hr className="w-full h-[1px] left-0 absolute bg-[##EFEFEF] top-[58px]" />
      <CardContent className="overflow-hidden">{children}</CardContent>
    </Card>
  );
};
