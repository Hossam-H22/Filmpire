const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// '2024-03-07' -> 'Mar 7, 2024'
export function formatDate(inputDate) {
    if (!inputDate) return '—';
    const [year, month, day] = inputDate.split('-').map(Number);
    return `${MONTHS[month - 1]} ${day}, ${year}`;
}

// 125 -> '2h 5m', 48 -> '48m'
export function formatRuntime(minutes) {
    if (!minutes) return null;
    return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`;
}

// TMDB air dates are plain days; one counts as aired from that day on
export function hasAired(airDate) {
    return Boolean(airDate) && new Date(airDate) <= new Date();
}

export const pad = (number) => String(number).padStart(2, '0');

// (2, 5) -> 'S2 · E05'
export const episodeCode = (season, episode) => `S${season} · E${pad(episode)}`;
