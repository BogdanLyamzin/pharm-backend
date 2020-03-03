import React, {useEffect, useState, useCallback} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom"

export const CreateAdmUser = () => {
	const message = useMessage();
	const histoty = useHistory();
	const {loading, request, error, clearError} = useHttp();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
		phone: "",
		department: "",
		role: ""
	});

	useEffect(()=>{
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() =>{
		window.M.updateTextFields();
	}, []);


	const changeHandler = event =>{
		setForm({...form, [event.target.name]: event.target.value})
	};

	const registerHandler = async () =>{
		try {
			const {result} = await request("/role");


			const match = result.map((item) => item.role === form.role);
			console.log(match)
			if(!match){
				const data = await request("/role", "POST", {role: form.role});
				message(data.message);
			}
			const data = await request("/adminUser", "POST", {...form});
			message(data.message);
			histoty.push("/admUsers");

		}catch (e) {}

	};

	return(
			<div className="row">
				<div className="col s6 offset-s3">
					<div className="card blue darken-1">
						<div className="card-content white-text">
							<span className="card-title">Create new User</span>
							<div>
								<div className="input-field">
									<input
											placeholder="Enter name"
											id="name" type="text"
											name="name"
											value={form.name}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="name">Name:</label>
								</div>
								<div className="input-field">
									<input
											placeholder="Enter email"
											id="email" type="email"
											name="email"
											value={form.email}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="email">Email:</label>
								</div>
								<div className="input-field">
									<input
											placeholder="Enter phone number"
											id="phone" type="tel"
											name="phone"
											value={form.phone}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="phone">Phone number:</label>
								</div>
								<div className="input-field ">

									<select  id="role" name="role" onChange={changeHandler}>
										<option value="" disabled selected>Choose role</option>
										<option value="owner">Owner</option>
										<option value="admin">Admin</option>
										<option value="content manager">Content manager</option>
									</select>
								</div>
								<div className="input-field">
									<input
											placeholder="Enter department"
											id="department" type="text"
											name="department"
											value={form.department}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="department">Department:</label>
								</div>
								<div className="input-field">
									<input
											placeholder="Enter password"
											id="password" type="password"
											name="password"
											value={form.password}
											className="yellow-input"
											onChange={changeHandler}
									/>
									<label htmlFor="password">Password:</label>
								</div>
								<div className="input-field">
									<input
											placeholder="Confirm password"
											id="confirm" type="password"
											name="confirm"
											value={form.confirm}
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