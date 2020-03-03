import React, {useCallback, useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";

import {Loader} from "../components/Loader";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";


export const UpdateAdmUser = () =>{
	const {request, loading, clearError, error} = useHttp();
	const message = useMessage();
	const histoty = useHistory();

	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		department: "",
		password: "",
		confirm: "",

	});
	const userId = useParams().id;
	const getUser= useCallback(async () =>{
		try {
			const fetched = await request(`/adminUser/${userId}`, "GET");
			setUser({...fetched.result, confirm: fetched.result.password});
		}catch (e) {

		}
	}, [userId, request]);

	useEffect(() =>{
		getUser();
		message(error);
		clearError();
		}, [getUser, error, clearError, message]);


	const changeHandler = event =>{
		setUser({...user, [event.target.name]: event.target.value})
	};

	const registerHandler = async () =>{
		try {
			console.log({...user});
			const data = await request(`/adminUser:${userId}`, "PUT", {...user});
			console.log(data)
			message(data.message);
			histoty.push("/admUsers");

		}catch (e) {}

	};

	if(loading){
		return <Loader/>
	}
	return(
			<div className="row">
				<div className="col s6 offset-s3">
					<div className="card blue darken-1">
						<div className="card-content white-text">
							<span className="card-title">Update User</span>
							<div>
								<div className="input-field">
									<input

											id="name" type="text"
											name="name"
											value={user.name}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="name">Name:</label>
								</div>
								<div className="input-field">
									<input
											id="email" type="email"
											name="email"
											value={user.email}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="email">Email:</label>
								</div>
								<div className="input-field">
									<input
											id="phone" type="tel"
											name="phone"
											value={user.phone}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="phone">Phone number:</label>
								</div>
								<div className="input-field ">

									<select  id="role" name="role" onChange={changeHandler}>
										<option value={user.role} disabled selected>Choose role</option>
										<option value="Owner">Owner</option>
										<option value="Admin">Admin</option>
										<option value="Content manager">Content manager</option>
									</select>
								</div>
								<div className="input-field">
									<input
											id="department" type="text"
											name="department"
											value={user.department}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="department">Department:</label>
								</div>
								<div className="input-field">
									<input
											placeholder=""
											id="password" type="password"
											name="password"
											value={user.password}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="password">Password:</label>
								</div>
								<div className="input-field">
									<input
											placeholder=""
											id="confirm" type="password"
											name="confirm"
											value={user.confirm}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="confirm">Confirm password:</label>
								</div>
							</div>
						</div>
						<div className="card-action">
							<button
									className="btn yellow darken-4"
									disabled={loading}
									onClick={registerHandler}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
	)
}