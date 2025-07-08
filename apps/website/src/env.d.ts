/// <reference types="astro/client" />
/// <reference types="@types/react" />
/// <reference types="@types/react-dom" />

declare module '*?client:load' {
  const component: any;
  export default component;
} 