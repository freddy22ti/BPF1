import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export const login = async (credentials) => {
	return await axios.post(`${API_URL}login`, credentials).then((response) => {
		if (response.data.code == 1) {
			const token = response.data.data.accessToken;
			const id = response.data.data.id;
			const role = response.data.data.role;
			
			localStorage.setItem("token", token);
			localStorage.setItem("id", id)
			localStorage.setItem("role", role)
			return token;
		} else {
			throw new Error("Login failed")
		}
		
	});
};

export const logout = () => {
	localStorage.removeItem("token");
};

export const register = async (credentials) => {
	return await axios.post(`${API_URL}register`, credentials);
};

