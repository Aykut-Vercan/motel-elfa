import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("cabin yüklenmedi");
    throw new Error("cabin yok baba");
  }
  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  //replace kullanmasak supabase her / iiçin klasor oluşturacaktı

  //eger böyle yapmasaydık supabase asagıdaki image /cabin-001/2 yapacaktı
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://buofkrhjaeaagxpbhayg.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg

  //1.create/update cabin
  let query = supabase.from("cabins");

  //Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //update
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //gelen data veya erroru cıkartıyoruz
  const { data, error } = await query.select().single();

  if (error) {
    console.error("cabin olusmadı");
    throw new Error("cabin olusturamadık ");
  }

  //2.Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

    
  //3.sorun varsa sil
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabin resmi yüklenemedi ve cabin olusturulmadı ");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("cabin silinmedi");
    throw new Error("cabin silemedik ");
  }
}
