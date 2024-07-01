import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PagesProps {
  page: number;
  current?: boolean;
  onClick: () => void;
}

export const Pages = ({ current, page, onClick }: PagesProps) => {
  return (
    <Button
      onClick={current ? undefined : onClick}
      variant="ghost"
      className={cn(
        "rounded-full p-1 text-xs size-5 flex items-center justify-center cursor-pointer hover:text-white",
        current
          ? "bg-[#58B761] text-white hover:bg-[#58B761]"
          : "hover:bg-[#58B761]/60"
      )}
    >
      <span>{page}</span>
    </Button>
  );
};

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const maxPagesToShow = 3;

  const renderPages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pages
          key={i}
          page={i}
          current={currentPage === i}
          onClick={() => onPageChange(i)}
        />
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-x-3">
      {currentPage > Math.ceil(maxPagesToShow / 2) && (
        <Button
          onClick={() => onPageChange(currentPage - maxPagesToShow)}
          variant="ghost"
          className="rounded-full p-1 text-xs size-5 flex items-center justify-center cursor-pointer hover:text-white hover:bg-[#58B761]/60"
        >
          ...
        </Button>
      )}
      {renderPages()}
      {currentPage < totalPages - Math.floor(maxPagesToShow / 2) && (
        <Button
          onClick={() => onPageChange(currentPage + maxPagesToShow)}
          variant="ghost"
          className="rounded-full p-1 text-xs size-5 flex items-center justify-center cursor-pointer hover:text-white hover:bg-[#58B761]/60"
        >
          ...
        </Button>
      )}
    </div>
  );
};

export default Pagination;
