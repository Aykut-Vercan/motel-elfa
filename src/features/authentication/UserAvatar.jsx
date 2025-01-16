import styled from "styled-components";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin: 5px;
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 0.11;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 1px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const navigate=useNavigate();
  const { user } = useUser();
  const { fullName, avatar } = user ? user.user_metadata : {};

  return (
    <StyledUserAvatar onClick={()=>navigate('/account')}>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}
export default UserAvatar;
