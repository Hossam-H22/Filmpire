import React from 'react'
import useStyles from './Pagination.style.js'
import { Button, Typography } from '@mui/material';


export default function Pagination({curruntPage, setPage, totalPages}) {
    const classes = useStyles();

    function handlePrev() {
        if(curruntPage !== 1){
            setPage((prevPage)=> prevPage-1);
        }
    }
    
    function handleNext() {
        if(curruntPage !== totalPages){
            setPage((prevPage)=> prevPage+1);
        }
    }

    if(totalPages===0) return null;
    
    return <>
        <div className={classes.container}>
            <Button onClick={handlePrev} className={classes.button} variant='contained' color='primary' >Prev</Button>
            <Typography variant='h5' className={classes.pageNumber}>{curruntPage}</Typography>
            <Button onClick={handleNext} className={classes.button} variant='contained' color='primary' >Next</Button>
        </div>
    </>
}
