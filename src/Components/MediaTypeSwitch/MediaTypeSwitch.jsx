import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMediaType } from './../../features/currentGenreOrCategory.js';
import { MEDIA_HOME, MEDIA_TYPES } from './../../utils/constants.js';
import useStyles from './MediaTypeSwitch.style.js';

// Movies | TV Shows pill that opens the home page of the chosen type
export default function MediaTypeSwitch({ fullWidth, onChange }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mediaType } = useSelector((state) => state.curruntGenreOrCategory);

    function select(value) {
        dispatch(setMediaType(value));
        navigate(MEDIA_HOME[value]);
        onChange?.(value);
    }

    return <div className={`${classes.switch} ${fullWidth ? classes.fullWidth : ''}`} role='group' aria-label='Browse'>
        {MEDIA_TYPES.map(({ label, value }) => (
            <button
                key={value}
                type='button'
                aria-pressed={value === mediaType}
                className={`${classes.option} ${value === mediaType ? classes.active : ''}`}
                onClick={() => select(value)}
            >
                {label}
            </button>
        ))}
    </div>
}
