import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const ChatItem = ({ content, role }:
    { content: string, role: "user" | "assistant" }) => {
    const auth = useAuth();
    return (
        role === "assistant" ? <Box sx={{
            display: "flex", p: 2, bgcolor: "#004d5612",
            my: 2, gap: 2
        }}>
            <Avatar sx={{ ml: "0" }}>
                <img src="deniz.jpeg" alt="" width={"40px"} height={"40px"} />
            </Avatar>

            <Box><Typography color={'white'} fontSize={"20px"}> {content}</Typography></Box>
        </Box > :
            <Box sx={{
                display: "flex", p: 2, bgcolor: "#004d56",
                gap: 2
            }}>
                <Avatar sx={{ ml: "0", bgcolor:"black", color:"white" }}>
                    {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                </Avatar>

                <Box><Typography color={'white'} fontSize={"20px"}> {content}</Typography></Box>
            </Box >

    )
}

export default ChatItem