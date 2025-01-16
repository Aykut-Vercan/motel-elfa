import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getGuests({ sortBy, page }) {

  let query = supabase.from("guests").select("*", { count: 'exact' });

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
    console.error("guest yüklenmedi");
    throw new Error("guest yok baba");
  }
  return { data, count };
}

export async function getAllGuests() {
  let query = supabase.from("guests").select("*", { count: 'exact' });
  const { data, error, count } = await query;
  if (error) {
    console.error("guest yüklenmedi");
    throw new Error("guest yok baba");
  }
  return { data, count };
}


export async function createUpdateGuest(newGuest, id) {
  console.log(newGuest, id);
  let query = supabase.from("guests");

  //Create
  if (!id) query = query.insert([newGuest]);
  //update
  if (id) query = query.update(newGuest).eq("id", id);

  //gelen data veya erroru cıkartıyoruz
  const { data, error } = await query.select().single();

  if (error) {
    console.error("guests olusmadı");
    throw new Error("guests olusturamadık ");
  }
  return data;
}

export async function deleteGuest(id) {
  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error.details);
    if (error.code === "23503") {
      throw new Error("The deletion was not performed because the relevant visitor was used in another record.");
    } else {
      throw new Error("guests silemedik ");
    }
  }
}
