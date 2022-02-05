import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PostStruc } from '../Home/Home';78954123

const Details = () => {
    const location = useLocation();
    const post: PostStruc | any = location?.state;
    const data = JSON.stringify(post);
    return (
        <div data-testId='details'>
            {data}
        </div>
    );
};

export default Details;