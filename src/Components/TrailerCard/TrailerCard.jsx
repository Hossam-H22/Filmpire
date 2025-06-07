import { Badge, Grid } from '@mui/material'
import React, { useState } from 'react'
import Loader from '../Loader/Loader.jsx'
import { useStyles } from './TrailerCard.style.js';

export default function TrailerCard({ video }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Grid item xs={12} sm={6} lg={3} p={1} sx={{ position: 'relative' }}>
            {isLoading && <div className={classes.Loader} >
                <Loader size='3rem' removeMargin />
            </div>}
            <iframe
                style={{ width: '100%', height: '100%', aspectRatio: '16/9', borderRadius: '10px' }}
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                allow='autoplay'
                onLoad={() => setIsLoading(false)}
            />
            <Badge
                badgeContent={video.official ? 'Official' : 'Unofficial'}
                color={video.official ? 'success' : 'warning'}
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 40,
                    '& .MuiBadge-badge': {
                        padding: '5px',
                        borderRadius: '5px',
                        fontSize: '0.75rem'
                    }
                }}
            />
        </Grid>
    )
}
