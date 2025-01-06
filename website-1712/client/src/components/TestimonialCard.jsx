import React, { useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

const TestimonialCard = ({ testimonial }) => {
    const [testimonialData, setTestimonialData] = useState({
        name: testimonial.name,
        photoBefore: testimonial.photoBefore, 
        photoAfter: testimonial.photoAfter,
        text: testimonial.text,
        role: testimonial.role,
      });
      const { name, photoBefore, photoAfter, text, role } = testimonialData;

    return(
        <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
               <div className='
                flex flex-row justify-center items-center
               '>
                <img src={photoBefore} alt="Before" />
                <img src={photoAfter} alt="After" />
               </div>
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                  {role}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                  {text}
                </Typography>
              </CardContent>
            </Card>
    )
}
export default TestimonialCard;