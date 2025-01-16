import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// RLS POLİTİKALARINI HATIRLA
export async function getBookings({ filter, sortBy, page }) {

  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)", { count: 'exact' }
    );
  //FILTER
  if (filter) query = query.eq(filter.field, filter.value);
  //SORTBY
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" })
  //Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to)
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Rezervasyon yüklenmedi");
    throw new Error("Rezervasyon yok baba");
  }
  return { data, count };
}

//get one booking for details page
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

//Create Booking
export async function createBooking(newBookingData) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBookingData])
    .select();

  if (error) {
    throw new Error("Booking could not be created");
  }

  return data;
}
//Update Booking
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
//DeleteBooking
export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Belirtilen tarihten sonra oluşturulan tüm REZERVASYONLARI döndürür. Örneğin son 30 gün içinde oluşturulan rezervasyonları almak için kullanışlıdır.
//date:ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Belirtilen tarihten sonra oluşturulan tüm STAYS'leri döndürür
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//Etkinlik, bugün bir giriş veya çıkış olduğu anlamına gelir
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Buna eşdeğer. Ancak bunu sorgulayarak, yalnızca gerçekten ihtiyacımız olan verileri indiriyoruz, aksi takdirde şimdiye kadar oluşturulmuş TÜM rezervasyonlara ihtiyacımız olurdu
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
