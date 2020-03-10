import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {AdminUserList} from "../components/AdminUserList";

export const AdmUsers = () =>{
	const [users, setUsers] = useState([]);
	const {loading, request} = useHttp();

	const fetchUsers = useCallback(async () =>{
		try {
			const feched = await request("/adminUsers");
			setUsers(feched.result)

		}catch (e) {}

	}, [request]);
	useEffect(() =>{
		fetchUsers()
	}, [fetchUsers]);
	if(loading){
		return <Loader />
	}

	return(
			<>
				{!loading && <AdminUserList users={users}/>}
			</>
	)
}