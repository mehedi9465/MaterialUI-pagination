import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Postinit } from '../Home/Home';

const Details = () => {
    const location = useLocation();
    const post: Postinit | any = location?.state;
    const data = JSON.stringify(post);
    
    
    return (
        <div>
            {data}
        </div>
    );
};

export default Details;