import React, { useState, useEffect } from 'react';
import { Button, notification, Skeleton } from 'antd';
import { useNavigate } from "react-router-dom";
import { AUTH_USER } from '../constants';
import { useAuth } from '../App';
import axios from 'axios';

const Home = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState();
    const [info, setInfo] = useState();

    const logout = () => {
        localStorage.setItem(AUTH_USER, null);
        auth.signout(() => navigate("/"));
    }

    useEffect(() => {
        setLoading(true);
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(res => {
            const temp = res.data.slice(-20);
            setStory(temp);
            setLoading(false);
        })
        .catch(error => {
            notification.error({message: "Try again loading"});
            setLoading(false);
        })
    },[])

    const fetchData = item => {
        setLoading(true);
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then(res => {
            setInfo(res.data);
            setLoading(false);
        })
        .catch(error => {
            notification.error({message: "Try again loading"});
            setLoading(false);
        })
    }


    return (
        <>
            <Button type="primary" onClick={logout}>
                Log out
            </Button>
            <div className="mb-50">
                <h2>Top Stories</h2>
                {
                    story && story.length > 0 &&
                    story.map((item, idx) => (
                        <React.Fragment key={idx.toString()}>
                            <span onClick={() => fetchData(item)}>{item}&nbsp;&nbsp;&nbsp;</span>
                        </React.Fragment>
                    ))
                }
            </div>
            
            
            <h3>Detailed Information</h3>
            {
                loading && <Skeleton />
            }
            {
                !loading && info &&
                <div>
                    <p>Author: {info.by}</p>
                    <p>Comment Count: {info.descendants}</p>
                    <p>Score: {info.score}</p>
                    <p>Title: {info.title}</p>
                    <p>URL: <a href={info.url} target="_blank" rel="noreferrer">{info.url}</a></p>

                </div>
            }
        </>
    )
}

export default Home