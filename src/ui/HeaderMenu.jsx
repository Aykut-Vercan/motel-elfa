import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./Button";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  gap:2rem;
`;

const HeaderMenu = () => {
    const navigate = useNavigate()
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <div> <HiOutlineUser /></div>
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
};

export default HeaderMenu;
