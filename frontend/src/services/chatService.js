import axios from "axios";

const API = "http://localhost:5000/api/chat";

export const askAI = async (message) => {

    const response = await axios.post(API, {
        message
    });

    return response.data.reply;
};