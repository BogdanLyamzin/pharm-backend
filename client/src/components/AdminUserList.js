import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";

export const AdminUserList = ({users}) =>{
	const { request } = useHttp();
	const histoty = useHistory();
	const deleteHandler = async (id) =>{
		try {
			const data = await request(`/adminUsers/${id}`, "DELETE");
			histoty.push("/admUsers");

		}catch (e) {}

	};

	if(!users.length){
		return (
				<h3 className="center">List is empty</h3>
		)
	}
	return(
			<table>
				<thead>
				<tr>
					<th>№</th>
					<th>Name</th>
					<th>Role</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Delete</th>
					<th>Update</th>

				</tr>
				</thead>

				<tbody>
				{users.map((user, index)=>{

					return(
							<tr key={user._id}>
								<td>{index + 1}</td>
								<td>{user.name}</td>
								<td>{user.role}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>
									<Link to="#" onClick={() => deleteHandler(user._id)}>Delete</Link>
								</td>
								<td>
									<Link to={`/update/${user._id}`}>Update</Link>
								</td>
							</tr>
					)
				})}

				</tbody>
			</table>
	)
}
