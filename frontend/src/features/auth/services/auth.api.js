import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export async function register({ username, email, password }) {
    const response = await api.post("/api/auth/register", {
        username,
        email,
        password
    });
    return response.data;
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email,
        password
    });
    return response.data;
}

export async function logout() {
    const response = await api.post("/api/auth/logout");
    return response.data;
}

export async function getMe() {
    // 401 here just means "not logged in yet" — expected, not a real error
    const response = await api.get("/api/auth/get-me");
    return response.data;
}
