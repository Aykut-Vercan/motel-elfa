import Row from "../ui/Row";
import Heading from "../ui/Heading";
import GuestTableOperations from "../features/guests/GuestTableOperations";
import GuestTable from "../features/guests/GuestTable";
import AddGuest from "../features/guests/AddGuest";
const Guests = () => {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <GuestTableOperations />
      </Row>

      <Row>
        < GuestTable />
        <AddGuest />
      </Row>
    </>
  );
};

export default Guests;
