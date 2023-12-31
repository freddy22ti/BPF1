export const success = (data) => {
	return {
		code: 1,
		message: "Success",
		data: data,
	};
};

export const error = (msg) => {
	return {
		code: 0,
		message: msg,
	};
};
