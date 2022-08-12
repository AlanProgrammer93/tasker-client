import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/forgot-password`, {
                email,
            });
            if (data.error) {
                toast.error(data.error);
                setLoading(false);
                return;
            } else {
                setVisible(true);
                toast.success("Enter the code you received in ypur email.");
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (password !== confirm) {
				toast.error("Passwords do not match");
				setLoading(false);
				return;
			}
            const {data} = await axios.post("/reset-password", {email, password, resetCode: code})

            if (data.error) {
                toast.error(data.error);
                setLoading(false);
                return;
            } else {
                toast.success("Password successfully changed. Now you can login with your new password.");
                setLoading(false);
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Try again.")
            setLoading(false);
        }
    }

    return (
        <div
            className='d-flex justify-content-center align-items-center vh-100'
            style={{ marginTop: "-100px" }}
        >
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 authbox'>
                        <h1 className='fw-bold mb-3'>Forgot Password</h1>

                        <form>
                            <Input
                                value={email}
                                setValue={setEmail}
                                label="Email"
                                type="email"
                            />
                            {
                                visible && (
                                    <>
                                        <Input
                                            value={code}
                                            setValue={setCode}
                                            label="Enter reset code"
                                            type="text"
                                        />
                                        <Input
                                            value={password}
                                            setValue={setPassword}
                                            label="New password"
                                            type="password"
                                        />
                                        <Input
                                            value={confirm}
                                            setValue={setConfirm}
                                            label="Confirm new password"
                                            type="password"
                                        />
                                    </>
                                )
                            }
                            <Button
                                handleSubmit={visible ? handleReset : handleSubmit}
                                email={email}
                                password={password}
                                loading={loading}
                            />
                        </form>

                        <p className='mt-3'>
                            <Link to="/login">Back to Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword