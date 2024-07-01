import { Card, CardTitle } from "@/components/ui/card";
import { BasicDetailsForm } from "./_components/basic-details-form";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions";
import { Logout } from "@/components/logout";
import { getRequest } from "@/lib/api";
import { CLIENT_USER_PROFILE } from "@/endpoints";

const SettingsPage = async () => {
  const { client } = await getRequest(CLIENT_USER_PROFILE);

  return (
    <div className="relative">
      <div className="absolute right-0 -top-12 lg:-top-[54px] ">
        <Logout />
      </div>
      <Card className="container-body">
        <CardTitle>Edit Basic Details</CardTitle>
        <BasicDetailsForm client={client} />
      </Card>
    </div>
  );
};

export default SettingsPage;
