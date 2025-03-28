import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <UserInfo 
      label="💻Componente de servidor"
      user={user}
    />
  );
}
 
export default ServerPage;