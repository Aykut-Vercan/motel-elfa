/* eslint-disable react/prop-types */
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBarSquare,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
    //1.
    const numBookings = bookings.length;
    //2.total sales
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    //3. checkins
    const checkins = confirmedStays.length;

    //4.occupancy rate
    const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="yellow"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="indigo"
                icon={<HiOutlineChartBarSquare />}
                value={Math.round(occupancy * 100) + '%'}
            />
        </>
    );
};

export default Stats;
