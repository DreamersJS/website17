import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonHeader({ content, onClick }) {
  return <Button sx={{
    color: "#ffffff", // white text for better contrast
    backgroundColor: "#177F2E",
    '&:hover': { backgroundImage: "radial-gradient(circle, #0b4017 0%, #177F2E 100%)" }
  }}
    onClick={onClick}
    variant="contained">{content}</Button>;
}

export function ButtonAction({ content, onClick }) {
  return <Button sx={{
    color: "#fff",
    padding: '10px',
    backgroundColor: '#177F2E',
    '&:hover': { backgroundColor: '#0b4017' }
  }}
    onClick={onClick}
  >{content}</Button>;
}
