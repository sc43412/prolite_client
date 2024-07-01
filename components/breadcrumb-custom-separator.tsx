import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/app/(browse)/(dashboard)/_components/sidebar/navigation";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface BreadcrumbWithCustomSeparatorProps {
  pathname: string; // Accept pathname as a prop
}

export function BreadcrumbWithCustomSeparator({
  pathname,
}: BreadcrumbWithCustomSeparatorProps) {
  if (pathname === "/dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const pathSegments = pathname.split("/").filter((segment) => segment);
  const viewIndex = pathSegments.indexOf("view");

  if (viewIndex !== -1) {
    pathSegments.splice(viewIndex + 1);
  }

  const getRouteLabel = (href: string) => {
    const route =
      routes.user.find((r) => r.href === href) ||
      routes.sidebar.find((r) => r.href === href);
    return route ? route.label : null;
  };

  if (pathname.startsWith("/user")) {
    const userSegment = pathSegments.slice(-1)[0];
    const userHref = `/${pathSegments.join("/")}`;
    const userLabel =
      getRouteLabel(userHref) ||
      userSegment.charAt(0).toUpperCase() + userSegment.slice(1);

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{userLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const displayText =
            segment === "view"
              ? "View"
              : getRouteLabel(href) ||
                segment.charAt(0).toUpperCase() + segment.slice(1);
          const isLastSegment = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>
                <Chevron />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLastSegment ? (
                  <BreadcrumbPage>{displayText}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const Chevron = () => {
  return <ChevronRight className="text-black font-medium !h-5 !w-8" />;
};

export const BreadcrumbsSkeleton = () => {
  return <Skeleton className="w-48 h-7" />;
};
