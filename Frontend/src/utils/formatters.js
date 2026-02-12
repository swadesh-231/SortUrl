/**
 * Date formatting utilities for SortUrl.
 * Backend expects ISO_LOCAL_DATE_TIME (yyyy-MM-ddTHH:mm:ss) for analytics
 * and ISO_LOCAL_DATE (yyyy-MM-dd) for total-clicks.
 */

const pad = (n) => String(n).padStart(2, '0');

/** Format Date → 'yyyy-MM-ddTHH:mm:ss' in LOCAL timezone */
export const formatLocalDateTime = (date) => {
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(date.getHours());
    const min = pad(date.getMinutes());
    const s = pad(date.getSeconds());
    return `${y}-${m}-${d}T${h}:${min}:${s}`;
};

/** Format Date → 'yyyy-MM-dd' in LOCAL timezone */
export const formatLocalDate = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/** Format ISO date string → 'Jul 15, 2024' */
export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
};

/** Format ISO date string → 'Jul 15' (short) */
export const formatDateShort = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric',
    });
};

/** Truncate a URL for display: https://example.com/very/long → example.com/very/lo... */
export const truncateUrl = (url, maxLen = 45) => {
    if (!url) return '';
    const clean = url.replace(/^https?:\/\//, '');
    return clean.length > maxLen ? clean.slice(0, maxLen) + '…' : clean;
};
