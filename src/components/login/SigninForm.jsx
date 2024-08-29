// Importing necessary components from the 'react' and 'react-icons' libraries
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import {updateCartFromBackend} from "../../features/cart/CartSlice"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import {Const} from "../../../utils/Constants"

// Functional component for the login form
const LoginForm = ({ setLogin }) => {
	const router = useRouter();
	// State variables to manage form inputs, visibility of the password, error messages, and loading state
	const [visible, setVisible] = useState(false);
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);

	// Function to validate the form inputs
	let validate = () => {
		setEmailError("");
		setPasswordError("");
		if (email === "") {
			setEmailError("Email is required");
		}
		if (password === "") {
			setPasswordError("Password is required");
		}
		if (email === "" || password === "") {
			setLoad(false);
			return false;
		}
		return true;
	};

	// Async function to handle user login

	const fetchData = async () => {
		try {
			// Extract token from local storage
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('Token not found in local storage');
			}
	
			// Fetch data from the backend
			const response = await fetch(`${Const.Link}api/addcart/getcart`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token })
			});
	
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			
			const dataFromBackend = await response.json();
			console.log("data from backend", dataFromBackend)
			dispatch(updateCartFromBackend(dataFromBackend))
			 // Parse response as JSON
			
		} catch (error) {
			console.error('Error fetching data from backend:', error);
		}
	};
	  
	let loginUser = async () => {
		setLoad(true);
		if (validate()) {
			try {
				const response = await fetch(`${Const.Link}api/user/signin`, {
					method: 'POST',
					headers: {
						'Content-type': 'Application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				const data = await response.json();

				// Check if the response is successful and contains the token
				if (response.ok) {
					// Store the token in local storage
					localStorage.setItem('token', data.token);
					await fetchData()

					// Clear any previous error messages
					setError("");
					router.push('/')
				} else {
					// Handle authentication errors
					setError("Invalid email or password");
				}

				setEmail("")
				setPassword("")
				setLoad(false)
			} catch (err) {
				// Handling authentication errors
				console.error("Oops", err)
				setLoad(false);
				console.log(err);
			}
		}
	};

	// JSX structure for the login form
	return (
		<div className="left-two">

			<div className="login-inner">
				<div className="login-t">Login</div>
				<div className='inp-rel'>
					<input
						className="login-inp"
						value={email}
						name="email"
						onChange={(e) => { setEmail(e.target.value) }}
						placeholder='Email'
					/>
					{emailError && <div className="error">{emailError}</div>}
				</div>
				<div className="pass-cont inp-rel">
					<div className="eye-cont flex-all" onClick={() => { setVisible(!visible) }}>
						{visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
					</div>
					<input
						className="login-inp"
						type={visible ? "text" : "password"}
						value={password}
						name="password"
						onChange={(e) => { setPassword(e.target.value) }}
						placeholder='Password'
					/>
					{passwordError && <div className="error">{passwordError}</div>}
				</div>
				<div className="login-btn flex-all" onClick={loginUser}>
					{load ?
						<div className="login-load"></div>
						: "Login"}
				</div>
				{error && <div className='login-error'>{error}</div>}
				<div className="not-up">Not a member yet? <span onClick={() => { setLogin(false) }}>Sign up</span></div>
			</div>
		</div>
	);
};

// Exporting the LoginForm component
export default LoginForm;
