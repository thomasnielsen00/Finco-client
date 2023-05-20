import { createContext } from 'react';
import { languageText } from './language';


export const UserContext = createContext(false);

export const LanguageContext = createContext(languageText.norwegian);
//sets norwegian as standard language
