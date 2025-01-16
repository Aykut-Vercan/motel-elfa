import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    //burada eventlistener'a true parametresini eklemek
    /*true parametresi, olayın capture phase'de dinlenmesi gerektiğini belirtir. 
    Yani, olay önce document'ta yakalanır ve daha sonra hiyerarşideki alt öğelere iner. 
    Bu, false olsaydı olay bubbling phase'de dinlenirdi, yani önce alt öğelerde işlenir 
    ve sonra yukarı doğru yayılır.*/
    // Capture phase kullanımı, bazı durumlarda dış tıklamaları daha erken yakalamak için tercih edilir.
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
