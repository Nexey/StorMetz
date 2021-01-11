import React from 'react';

export const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => {
        switch(this.theme){
            case 'light':
                this.theme='dark';
                break;
            case 'dark':
                this.theme='light';
                break;
        }
    },
});