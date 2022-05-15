import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { AUTH_USER } from '../constants';
import { useAuth } from '../App';

const Home = () => {

    let auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem(AUTH_USER, null);
        auth.signout(() => navigate("/"));
    }

    return (
        <>
            <Button type="primary" onClick={logout}>
                Log out
            </Button>
        </>
    )
}

export default Home