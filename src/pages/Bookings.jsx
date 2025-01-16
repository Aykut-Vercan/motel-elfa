import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBoking";
const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Booking</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingTable />
        <AddBooking />
      </Row>
    </>
  );
};

export default Bookings;
