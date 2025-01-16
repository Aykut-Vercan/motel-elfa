import Row from "../ui/Row";
import Heading from "../ui/Heading";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
const Dashboard = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">DashBoard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
};

export default Dashboard;
