import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
    

}

export const checkAuthStatus= async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
    

}


export const sendChatRequest = async (message: string) => {
    console.log("api 27 line, error below???");

    try {
        const res = await axios.post("/chat/new", { message });
        console.log("api 29 line");

        if (res.status !== 200) {
            throw new Error("Unable to send chat!");
        }

        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error in sendChatRequest:", error);
        throw error; // Re-throw the error to propagate it further
    }
}
