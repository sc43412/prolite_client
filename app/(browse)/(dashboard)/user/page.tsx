import { redirect } from "next/navigation";

const UserPage = () => {
  redirect("/user/settings");

  return <div>UserPage</div>;
};

export default UserPage;
