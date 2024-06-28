import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    console.log("chat controller 11");
    const { message } = req.body;
    try {
        console.log("chat controller 13");
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "user not registered OR token malfunctioned" });
        // Get the user's chat history
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Send all chats including the new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // Update user's chat history with the AI response
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        // Return the updated chat history as response
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, from chat-controller" });
    }
};
//# sourceMappingURL=chat-controllers.js.map