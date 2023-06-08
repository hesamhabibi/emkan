/* eslint-disable no-param-reassign */
const moment = require('moment-jalaali');

const { PersianCalendar, GregorianCalendar, all_titles } = require('./events');

const get_events = (from_date, to_date, types = null) => {
    from_date = parseInt(from_date, 10);
    to_date = parseInt(to_date, 10);
    const start_date = new Date(from_date);
    const end_date = new Date(to_date);

    let persian_events = [];
    const start_p_year = moment(`${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`, 'YYYY-MM-DD').jYear();
    const end_p_year = moment(`${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`, 'YYYY-MM-DD').jYear();
    for (let year = start_p_year; year <= end_p_year; year += 1) {
        const p = PersianCalendar.map(event => {
            const m = moment(`${year}-${event.month}-${event.day}`, 'jYYYY-jMM-jDD');
            return {
                ...event,
                type_title: all_titles[event.type],
                month: m.month() + 1 || 0,
                day: m.date() || 0,
                jMonth: m.jMonth() + 1 || 0,
                jDay: m.jDate() || 0,
                date: (m.unix() * 1000),
            };
        });
        persian_events = [...persian_events, ...p];
    }
    let gregorian_events = [];
    const start_g_year = (start_date.getFullYear());
    const end_g_year = (end_date.getFullYear());
    for (let year = start_g_year; year <= end_g_year; year += 1) {
        const g = GregorianCalendar.map(event => {
            const date = new Date(year, event.month - 1, event.day);
            const m = moment(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, 'YYYY-MM-DD');
            return {
                ...event,
                type_title: all_titles[event.type],
                month: date.getMonth() + 1,
                day: date.getDate(),
                jMonth: m.jMonth() + 1 || 0,
                jDay: m.jDate() || 0,
                date: date.getTime(),
            };
        });
        gregorian_events = [...gregorian_events, ...g];
    }

    persian_events = persian_events.filter(event => {
        if (event.date >= from_date && event.date <= to_date) {
            return true;
        }
        return false;
    });

    gregorian_events = gregorian_events.filter(event => {
        if (event.date >= from_date && event.date <= to_date) {
            return true;
        }
        return false;

    });

    if (Array.isArray(types) && types.length > 0) {
        persian_events = persian_events.filter(event => {
            if (types.includes(event.type)) {
                return true;
            }
            return false;
        });

        gregorian_events = gregorian_events.filter(event => {
            if (types.includes(event.type)) {
                return true;
            }
            return false;

        });
    }

    const result = [
        ...persian_events,
        ...gregorian_events,
    ];
    return result;
};

module.exports = {
    get_events,
};