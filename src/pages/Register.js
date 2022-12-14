import React, { useContext, useState } from 'react'
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { saveInLocalStorage } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
	const [auth, setAuth] = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [confirm, setConfirm] = useState("")
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (password !== confirm) {
				toast.error("Passwords do not match");
				setLoading(false);
				return;
			}
			// console.log("registering user", { name, email, password });
			const { data } = await axios.post(`/signup`, {
				name,
				email,
				password,
			});
			if (data.error) {
				toast.error(data.error);
				setLoading(false);
				return;
			} else {
				// context
				setAuth(data);
				// save in localstorage
				saveInLocalStorage("auth", data);
				toast.success("Successfully registered");
				// setLoading(false);
				setTimeout(() => {
					navigate("/dashboard");
				}, 1500);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<div
			className='d-flex justify-content-center align-items-center vh-100'
		>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 offset-md-3 authbox'>
						<h1 className='fw-bold mb-3'>Register</h1>

						<form>
							<Input
								value={name}
								setValue={setName}
								label="Name"
								type="text"
							/>
							<Input
								value={email}
								setValue={setEmail}
								label="Email"
								type="email"
							/>
							<Input
								value={password}
								setValue={setPassword}
								label="Password"
								type="password"
							/>
							<Input
								value={confirm}
								setValue={setConfirm}
								label="Confirm password"
								type="password"
							/>
							<Button
								handleSubmit={handleSubmit}
								name={name}
								email={email}
								password={password}
								loading={loading}
							/>
						</form>

						<p className='mt-3'>
							Already registered? <Link to="/login">Login</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register