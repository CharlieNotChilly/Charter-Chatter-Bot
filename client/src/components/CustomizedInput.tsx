import { TextField } from '@mui/material';
import React from 'react';

type Props = {
    name: string,
    type: string,
    label: string,
};

const CustomizedInput = (props: Props) => {
    return (
        <TextField 
            InputLabelProps={{ style: { color: "white" } }} 
            name={props.name} 
            label={props.label} 
            type={props.type}
            sx={{
                '& .MuiInputBase-input': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
                width: '400px',
                borderRadius: 10,
                fontSize: 15,
            }}
        />
    );
};

export default CustomizedInput;
