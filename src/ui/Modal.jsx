/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  //cloneElement temelde başka bir elemanı temel alarak yeni bir React elemanı oluşturmamızı sağlar ve prop geçeriz.
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  /*Peki neden bu portalı kullanmamız gerekiyor?
  Bir portalın gerekli olmasının ana nedeni,gizli olarak ayarlanmış
  CSS özelliği taşması ile çakışmaları önlemektir.
*/

  return createPortal(
    //element olarak root divi dışına bir tag koymak istediğimizde
    // ilk önce jsx alır,2.parametrede nerede konumlanacagınızı alır
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark color="red" />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

/*Çoğu zaman modal gibi bir bileşen oluşturuyoruz ve gayet iyi çalışıyor, 
ancak daha sonra başka bir geliştirici bunu başka bir yerde
yeniden kullanacak ve bu başka yer, modalin üstte ayarlanmış bir 
overFlow:hidden tarafından kesileceği bir yer olabilir.

Yani bu temelde tamamen yeniden kullanılabilirlik 
ve bileşenin bir üst öğede hidden olarak ayarlanmış 
bir overflow özelliği tarafından asla kesilmeyeceğinden emin olmakla ilgilidir.*/
//Bu nedenle, bu tür bir durumdan kaçınmak için modali DOM'un geri kalanının tamamen dışında oluşturuyoruz.
