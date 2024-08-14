import DashboardLayout from "../../layout/User/DashboardLayout";
import UserTask from "./UserTask";
//import SideBar from "../../components/SideBar/Sidebar";

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <UserTask />
    </DashboardLayout>
  );
};

export default Dashboard;
