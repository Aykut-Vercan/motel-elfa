/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiXMark } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteGuest } from "./useDeleteGuest";
//import { useCreateGuest } from "./useCreateGuest";
import CreateGuestForm from "./CreateGuestForm";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ID = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Nationality = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const GuestRow = ({ guest }) => {
    const { isDeleting, deleteGuest } = useDeleteGuest();
    // eger kayıt duplicate etmek istersen asagıda createGuesti cagırıp kullanmak lazım
    // const { isCreating, createGuest } = useCreateGuest();

    const { id: guestId, fullName, email, nationalID, nationality, countryFlag } = guest;
    const deletedData = "guest " + fullName
    return (
        <Table.Row>
            <Flag src={countryFlag} alt={nationality} />
            <Guest>{fullName}</Guest>
            <div>{email}</div>
            <ID>{nationalID}</ID>
            <Nationality>{nationality}</Nationality>
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={guestId} />
                    <Menus.List id={guestId}>

                        <Modal.Open opens="updateGuest">
                            <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
                        </Modal.Open>
                        <Modal.Open opens="deleteGuestWindow">
                            <Menus.Button icon={<HiXMark />}>Delete</Menus.Button>
                        </Modal.Open>
                    </Menus.List>

                    <Modal.Window name="updateGuest">
                        <CreateGuestForm guestToUpdate={guest} />
                    </Modal.Window>

                    <Modal.Window name="deleteGuestWindow">
                        <ConfirmDelete
                            resourceName={deletedData}
                            disabled={isDeleting}
                            onConfirm={() => deleteGuest(guestId)}
                        />
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    )
}

export default GuestRow