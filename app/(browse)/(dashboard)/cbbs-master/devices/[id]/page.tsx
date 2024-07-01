import { Card } from "@/components/ui/card";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { DEVICE_LIST } from "@/endpoints";
import { postRequest } from "@/lib/api";

const CBSMasterPage = async ({ params }: { params: { id: string } }) => {
  const table = await postRequest(DEVICE_LIST, {
    page: 0,
    size: 10,
    cbs_id: params.id,
  });

  return (
    <Card className="w-[380px] sm:w-[700px] md:w-full p-3 md:p-5 mx-auto">
      <DataTable
        cbs_id={params.id}
        columns={columns}
        initialData={table.cbs_list || []}
        totalCount={table.totalCount || 0}
        initialPageSize={20}
      />
    </Card>
  );
};

export default CBSMasterPage;
