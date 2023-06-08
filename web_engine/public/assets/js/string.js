const digit_to_en = string => {
    return string ? string?.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) & 0xf;
    }) : ''
}