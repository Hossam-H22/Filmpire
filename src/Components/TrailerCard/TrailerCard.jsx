import { Badge, Grid } from '@mui/material'
import React from 'react'

export default function TrailerCard({ video }) {
    return (
        <Grid item xs={12} sm={6} lg={3} p={1} key={video.id} sx={{ position: 'relative' }}>
            <iframe
                // autoPlay
                style={{ width: '100%', height: '100%', aspectRatio: '16/9', borderRadius: '10px' }}
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                allow='autoplay'
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
