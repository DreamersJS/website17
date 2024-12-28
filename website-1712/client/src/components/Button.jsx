import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({content}) {
  return <Button sx={{ 
    color: "#121d12",
    backgroundColor: '#177F2E',
     '&:hover': { backgroundImage: "radial-gradient(circle, #0b4017 0%, #177F2E 100%)" } 
    }} variant="contained">{content}</Button>;
}
