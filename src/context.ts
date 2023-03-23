import { createContext } from 'react';
import { languageText } from './language';
import { User } from './user-service';

export const UserContext = createContext(false);
// her legge man i startverdi (der det står tom) bør sikkert være et objekt med ingen verdier

export const LanguageContext = createContext(languageText.norwegian);
//sets norwegian as standard language
