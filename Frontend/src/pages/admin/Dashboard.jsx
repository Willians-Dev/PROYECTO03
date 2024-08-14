import DashboardLayout from "../../layout/User/DashboardLayout";

import UserTable from "../../components/Admin/UserTable";

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard del Administrador">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <UserTable />
    </DashboardLayout>
  );
};

export default Dashboard;
