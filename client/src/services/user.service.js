import axios from "axios";
import authHeader from "./auth-header.js";

const API_URL = "http://localhost:3000/api/";

export const getUserProfile = async () => {
	return await axios.get(API_URL + "user", {
		headers: authHeader(),
	});
};

export const updateUserProfile = (profile) => {
	return axios.put(API_URL + "user", profile, {
		headers: authHeader(),
	});
};

export const getQuestions = async () => {
	return await axios.get(API_URL + "question", { headers: authHeader() });
};

export const getQuestionById = async (id) => {
	return await axios.get(API_URL + "question/" + id, {
		headers: authHeader(),
	});
};

export const getQuestionByUserId = async () => {
	return await axios.get(API_URL + "user/question", {
		headers: authHeader(),
	});
};

export const createQuestion = (question) => {
	return axios.post(API_URL + "question", question, {
		headers: authHeader(),
	});
};

export const updateQuestion = (id, question) => {
	return axios.put(API_URL + "question/" + id, question, {
		headers: authHeader(),
	});
};

export const deleteQuestion = (id) => {
	return axios.delete(API_URL + "question/" + id, {
		headers: authHeader(),
	});
};

export const searchQuestion = async (title) => {
	return await axios.get(API_URL + "search/" + title, {
		headers: authHeader(),
	});
};

export const getAnswer = async (id) => {
	return await axios.get(API_URL + "answer/" + id, {
		headers: authHeader(),
	});
};

export const createAnswer = (answer) => {
	return axios.post(API_URL + "answer", answer, {
		headers: authHeader(),
	});
};

// updateAnswer(id, answer) {
// 	return axios.put(API_URL + "answer/" + id, answer, {
// 		headers: authHeader(),
// 	});
// }

export const deleteAnswer = async (id) => {
	return await axios.delete(API_URL + "answer/" + id, {
		headers: authHeader(),
	});
};

export const getKategori = async () => {
	return await axios.get(`${API_URL}kategori/`, {
		headers: authHeader(),
	});
};

export const createVote = async (id, value) => {
	return await axios.post(`${API_URL}vote/${id}`, value, {
		headers: authHeader(),
	});
};

export const deleteVote = async (id) => {
	return await axios.delete(`${API_URL}vote/${id}`, {
		headers: authHeader(),
	});
};

export const verifyAnswer = async (id) => {
	return await axios.get(`${API_URL}verifyAnswer/${id}`, {
		headers: authHeader(),
	});
};
