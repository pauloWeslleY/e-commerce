// import FormLayout from "../../components/FormLayout";
import { Dashboard } from "../Dashboard/Dashboard";
import { PageUsers } from "./Users";
import { UsersTable } from "./components/UsersTable";

export function Users() {
   return (
      <Dashboard>
         <PageUsers />

         <UsersTable />

         {/* <FormLayout /> */}
      </Dashboard>
   );
}
