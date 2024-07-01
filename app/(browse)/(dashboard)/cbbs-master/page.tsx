import { Card } from "@/components/ui/card";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { postRequest } from "@/lib/api";
import { CBS_LIST } from "@/endpoints";

const CBSMasterPage = async () => {
  const table = await postRequest(CBS_LIST, {
    page: 0,
    size: 10,
  });

  return (
    <Card className="w-[380px] sm:w-[700px] md:w-full p-3 md:p-5 !lg:pb-0 mx-auto">
      <DataTable
        columns={columns}
        initialData={table.cbs_list || []}
        totalCount={table.totalCount || 0}
        initialPageSize={20}
      />
    </Card>
  );
};

export default CBSMasterPage;
