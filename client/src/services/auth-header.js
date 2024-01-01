export default function authHeader() {
	const token = localStorage.getItem("token");

	if (token) {
		// for node js backend
		return { "x-access-token": token };
	} else {
		return {};
	}
}
