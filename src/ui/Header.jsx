import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom:1px solid var(--color-grey-200);
    display: flex;
    gap:3rem;
    align-items: center;
    justify-content:space-between;
`;

const Header = () => {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    )
}

export default Header;