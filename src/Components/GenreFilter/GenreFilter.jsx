import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { browseUrl, useBrowseParams } from './../../utils/browse.js';
import { CATEGORIES } from './../../utils/constants.js';
import { Tabs } from './../index.js';
import useStyles from './GenreFilter.style.js';

// Category tabs plus a horizontally scrolling row of genre chips, for movies or TV shows (mediaType).
// Both read and write the URL; picking either leaves search mode, and picking the active genre again clears it
export default function GenreFilter({ mediaType = 'movie' }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { data } = useGetGenresQuery(mediaType);
    const { genre, category } = useBrowseParams(mediaType);
    const row = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

    const updateArrows = useCallback(() => {
        const element = row.current;
        if (!element) return;
        setCanScroll({
            left: element.scrollLeft > 1,
            right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
        });
    }, []);

    useEffect(() => {
        const element = row.current;
        if (!element) return undefined;
        updateArrows();
        const observer = new ResizeObserver(updateArrows);
        observer.observe(element);
        return () => observer.disconnect();
    }, [updateArrows, data]);

    // Keep the selected genre visible, e.g. after a reload with ?genre= in the URL
    useEffect(() => {
        const element = row.current;
        const chip = element?.querySelector('[aria-pressed="true"]');
        if (!element || !chip) return;
        const chipLeft = chip.offsetLeft - element.offsetLeft;
        if (chipLeft < element.scrollLeft || chipLeft + chip.offsetWidth > element.scrollLeft + element.clientWidth) {
            element.scrollTo({ left: chipLeft - 48 });
        }
    }, [genre, data]);

    function scrollRow(direction) {
        const element = row.current;
        element?.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: 'smooth' });
    }

    return <div className={classes.container}>
        <Tabs
            label='Categories'
            tabs={CATEGORIES[mediaType]}
            value={category}
            onChange={(value) => navigate(browseUrl(mediaType, { category: value }))}
        />
        <div className={classes.rowWrapper}>
            {canScroll.left && <div className={`${classes.edge} ${classes.edgeLeft}`}>
                <IconButton size='small' className={classes.arrow} aria-label='Scroll genres left' onClick={() => scrollRow(-1)}>
                    <ChevronLeft fontSize='small' />
                </IconButton>
            </div>}
            <div className={classes.chips} ref={row} onScroll={updateArrows} role='group' aria-label='Genres'>
                {data?.genres?.map(({ id, name }) => (
                    <Chip
                        key={id}
                        label={name}
                        clickable
                        aria-pressed={id === genre}
                        color={id === genre ? 'primary' : 'default'}
                        variant={id === genre ? 'filled' : 'outlined'}
                        onClick={() => navigate(browseUrl(mediaType, id === genre ? {} : { genre: id }))}
                        className={classes.chip}
                    />
                ))}
            </div>
            {canScroll.right && <div className={`${classes.edge} ${classes.edgeRight}`}>
                <IconButton size='small' className={classes.arrow} aria-label='Scroll genres right' onClick={() => scrollRow(1)}>
                    <ChevronRight fontSize='small' />
                </IconButton>
            </div>}
        </div>
    </div>
}
