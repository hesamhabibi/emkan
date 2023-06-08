/* eslint-disable no-useless-escape */

const convert_persian_to_english = (sym) => {
    sym = sym.replace(/ا/g, "a");
    sym = sym.replace(/أ/g, "a");
    sym = sym.replace(/آ/g, "a");
    sym = sym.replace(/إ/g, "e");
    sym = sym.replace(/ب/g, "b");
    sym = sym.replace(/پ/g, "p");
    sym = sym.replace(/ت/g, "t");
    sym = sym.replace(/ث/g, "th");
    sym = sym.replace(/ج/g, "j");
    sym = sym.replace(/چ/g, "ch");
    sym = sym.replace(/ح/g, "h");
    sym = sym.replace(/خ/g, "kh");
    sym = sym.replace(/د/g, "d");
    sym = sym.replace(/ذ/g, "d");
    sym = sym.replace(/ر/g, "r");
    sym = sym.replace(/ز/g, "z");
    sym = sym.replace(/ژ/g, "zh");
    sym = sym.replace(/س/g, "s");
    sym = sym.replace(/ش/g, "sh");
    sym = sym.replace(/ص/g, "s");
    sym = sym.replace(/ض/g, "d");
    sym = sym.replace(/ط/g, "t");
    sym = sym.replace(/ظ/g, "z");
    sym = sym.replace(/ع/g, "'e");
    sym = sym.replace(/غ/g, "gh");
    sym = sym.replace(/ف/g, "f");
    sym = sym.replace(/ق/g, "q");
    sym = sym.replace(/ك/g, "k");
    sym = sym.replace(/ک/g, "k");
    sym = sym.replace(/گ/g, "g");
    sym = sym.replace(/ل/g, "l");
    sym = sym.replace(/م/g, "m");
    sym = sym.replace(/ن/g, "n");
    sym = sym.replace(/ه/g, "h");
    sym = sym.replace(/و/g, "w");
    sym = sym.replace(/ي/g, "y");
    sym = sym.replace(/ى/g, "y");
    sym = sym.replace(/ی/g, "y");
    sym = sym.replace(/ئ/g, "'e");
    sym = sym.replace(/ء/g, "'");
    sym = sym.replace(/ؤ/g, "'e");
    sym = sym.replace(/لا/g, "la");
    sym = sym.replace(/ة/g, "h");
    sym = sym.replace(/؟/g, "?");
    sym = sym.replace(/!/g, "!");
    sym = sym.replace(/ـ/g, "");
    sym = sym.replace(/،/g, ",");
    sym = sym.replace(/َ‎/g, "a");
    sym = sym.replace(/ُ/g, "u");
    sym = sym.replace(/ِ‎/g, "e");
    sym = sym.replace(/ٌ/g, "un");
    sym = sym.replace(/ً/g, "an");
    sym = sym.replace(/ٍ/g, "en");
    sym = sym.replace(/ّ/g, "");
    sym = sym.replace(/\n/g, "\n");
    return sym;
};

const convert_signs_to = (str, sign) => {
    str = str.replace(/\~/g, sign);
    str = str.replace(/\!/g, sign);
    str = str.replace(/\@/g, sign);
    str = str.replace(/\#/g, sign);
    str = str.replace(/\$/g, sign);
    str = str.replace(/\%/g, sign);
    str = str.replace(/\^/g, sign);
    str = str.replace(/\^/g, sign);
    str = str.replace(/\&/g, sign);
    str = str.replace(/\*/g, sign);
    str = str.replace(/\(/g, sign);
    str = str.replace(/\)/g, sign);
    str = str.replace(/\_/g, sign);
    str = str.replace(/\-/g, sign);
    str = str.replace(/\+/g, sign);
    str = str.replace(/\=/g, sign);
    str = str.replace(/\\/g, sign);
    str = str.replace(/\|/g, sign);
    str = str.replace(/\[/g, sign);
    str = str.replace(/\]/g, sign);
    str = str.replace(/\{/g, sign);
    str = str.replace(/\}/g, sign);
    str = str.replace(/\'/g, sign);
    str = str.replace(/\"/g, sign);
    str = str.replace(/\;/g, sign);
    str = str.replace(/\:/g, sign);
    str = str.replace(/\//g, sign);
    str = str.replace(/\?/g, sign);
    str = str.replace(/\./g, sign);
    str = str.replace(/\</g, sign);
    str = str.replace(/\>/g, sign);
    str = str.replace(/\,/g, sign);
    str = str.replace(/\،/g, sign);
    str = str.replace(/\؛/g, sign);
    str = str.replace(/\,/g, sign);
    str = str.replace(/\×/g, sign);
    str = str.replace(/\÷/g, sign);
    return str;
};

const convert_to_english_variable_name = (str) => {
    str = convert_persian_to_english(str);
    str = convert_signs_to(str, "_");
    if (/\d.*/.test(str)) str = `v_${str}`;
    return str;
};

module.exports = {
    convert_persian_to_english,
    convert_signs_to,
    convert_to_english_variable_name,
};