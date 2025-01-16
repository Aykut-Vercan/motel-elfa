import { formatDistance, parseISO, differenceInDays } from "date-fns";


// Bu fonksiyonun hem Date nesneleri hem de dizeler (Supabase'den gelen) için çalışmasını istiyoruz
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase'in bir ISO tarih dizesine ihtiyacı var. Ancak, bu dize her render'da farklı olacak çünkü MS veya SEC değişti ve bu iyi değil. Bu yüzden herhangi bir zamanı kaldırmak için bu numarayı kullanıyoruz
export const getToday = function (options = {}) {
  const today = new Date();

  // Bu, Supabase'den created_at ile karşılaştırılmalıdır, çünkü 0.0.0.0'da değildir, bu yüzden önceki tarihlerle karşılaştırdığımızda tarihi günün END'i olarak ayarlamamız gerekir.
  if (options?.end)
    // Günün son saniyesine ayarlandı
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
