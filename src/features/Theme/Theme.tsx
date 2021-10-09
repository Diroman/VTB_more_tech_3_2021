import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { ThemeProvider as MuiThemeProvider,  } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import {Colors} from '../../common/enums/Colors';
import { ruRU } from '@material-ui/core/locale';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato", sans-serif;
    font-style: normal;
  },

    /* Указываем box sizing */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  /* Убираем внутренние отступы */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Убираем внешние отступы */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  html {
    height: 100%;
  }

  body {
    width: 100%;
    font-family: Lato,serif;
    scroll-behavior: smooth;
    overflow-x: hidden;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    background-color: ${Colors.whiteSmoke};
  }

  /* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Упрощаем работу с изображениями */
  img {
    max-width: 100%;
    display: block;
  }

  /* Указываем понятную периодичность в потоке данных у article*/
  article > * + * {
    margin-top: 1em;
  }

  /* Наследуем шрифты для инпутов и кнопок */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  #app {
    height: 100%;
    width: 100%;
  }
`;

const theme = createTheme({
  typography: {
    "fontFamily": `"Montserrat"`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary: {
      main: Colors.blue2,
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    },
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before': {
          backgroundColor: 'white'
        },
      },
    },
  },
}, ruRU);

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <Normalize/>
      <GlobalStyle/>
      {children}
    </MuiThemeProvider>
  </ThemeProvider>
);
