import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {get_language} from "../helpers/storage";
import resources from '../langs'

i18n.use(initReactI18next).init({
    resources,
    lng: get_language() || 'fa',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;