import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH_USER } from '../constants';
import { useAuth } from '../App';

const Login = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const onFinish = (values) => {
        console.log('Success:', values);
        // go to the home page for story

        // store logged in user's info
        localStorage.setItem(AUTH_USER, values.email);
        auth.signin(values, () => {
            navigate("/home", { replace: true });
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{span: 8}}
                style={{width: "80%", marginTop: "50px"}}
            >
                <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First name!',
                        },
                        {
                            min: 3,
                            message: 'More than 3 letters'
                        }
                    ]}
                    >
                        <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Last name!',
                        },
                        {
                            min: 3,
                            message: 'More than 3 letters'
                        }
                    ]}
                    >
                        <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        { 
                            type: 'email',
                            message: 'Please enter a validate email!'
                        }
                    ]}
                    >
                        <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit" type="primary">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login