import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const RESTORE_TIMEOUT_MS = 2000;

// Scroll position of every history entry, by location key
const scrollPositions = {};

// A new page opens at the top; Back and Forward return to where the user was on that entry.
// Filter and page changes on the same page are left to the page itself
const NavigationScroll = ({ children }) => {
    const { key, pathname } = useLocation();
    const navigationType = useNavigationType();
    const currentKey = useRef(key);
    const previousPathname = useRef(pathname);

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        const onScroll = () => {
            scrollPositions[currentKey.current] = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Layout effect: switch keys before any scroll event of the new page can be saved under the old one
    useLayoutEffect(() => {
        currentKey.current = key;
        const isNewPathname = pathname !== previousPathname.current;
        previousPathname.current = pathname;

        if (navigationType !== 'POP') {
            if (isNewPathname) window.scrollTo(0, 0);
            return undefined;
        }

        // The page may still be loading, so keep trying until it is tall enough
        const target = scrollPositions[key] ?? 0;
        const startedAt = Date.now();
        let frame;
        const restore = () => {
            window.scrollTo(0, target);
            if (Math.abs(window.scrollY - target) > 1 && Date.now() - startedAt < RESTORE_TIMEOUT_MS) {
                frame = requestAnimationFrame(restore);
            }
        };
        // Stop as soon as the user scrolls on their own
        const stop = () => cancelAnimationFrame(frame);
        const userEvents = ['wheel', 'touchstart', 'keydown'];
        userEvents.forEach((event) => window.addEventListener(event, stop, { passive: true }));
        restore();
        return () => {
            stop();
            userEvents.forEach((event) => window.removeEventListener(event, stop));
        };
    }, [key, pathname, navigationType]);

    return children || null;
};

export default NavigationScroll;
