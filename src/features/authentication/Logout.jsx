import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/Button";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon variation="danger" disabled={isLoading} onClick={logout}>
      {!isLoading ? (
        <div>
          <HiArrowRightOnRectangle />
        </div>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
};

export default Logout;
