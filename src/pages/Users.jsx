import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const NewUser = () => {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
};

export default NewUser;
