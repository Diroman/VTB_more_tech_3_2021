
declare module '*.png' {
  const content: string;

  export default content;
}
declare module '*.jpeg' {
  const content: string;

  export default content;
}
declare module '*.jpg' {
  const content: string;

  export default content;
}
declare module '*.ico' {
  const content: string;

  export default content;
}
declare module '*.gif' {
  const content: string;

  export default content;
}
declare module '*.svg' {
  const content: any;

  export default content;
}
declare module '*.ttf' {
  const content: any;

  export default content;
}
declare module '*.mp4' {
  const content: string;

  export default content;
}
declare module '!!raw-loader*' {
  const content: string;

  export default content;
}

declare module '*.woff' {
  const content: any;

  export default content;
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
