/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate(); //cb'te veya bi fonnk icinde kullanabiliriz en üstte değiil

    //1.Load authenticated user
    const { isAuthenticated, isLoading, isFetching } = useUser();

    //2.if there is no authenticared user, redirect to login
    useEffect(() => {
        if (!isLoading && !isFetching) {
            if (!isAuthenticated) {
                navigate("/login");
            }
        }
    }, [isAuthenticated, isLoading, isFetching, navigate]);

    //3.while loading, show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    //4. if there is a user reder app
    if (isAuthenticated) return children;

    return null;
};

export default ProtectedRoute;
