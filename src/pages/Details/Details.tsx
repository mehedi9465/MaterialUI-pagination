import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PostType } from '../Home/Home';

const Details = () => {
    const location = useLocation();
    const [post , setPost] = useState<PostType | unknown | undefined>()
    setPost(location?.state);
    
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {/* {post?.title} */}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                    </Typography>
                    <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;