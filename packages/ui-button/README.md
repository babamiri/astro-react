# UI Button Package

A React button component that can be used in Astro applications.

## Installation

```bash
pnpm install @astro-react/ui-button
```

## Usage

```tsx
import { Button } from '@astro-react/ui-button';

function MyComponent() {
  return (
    <Button 
      text="Click me!" 
      onClick={() => console.log('Button clicked')}
    />
  );
}
```

## Props

- `text`: The text to display in the button
- `onClick`: Optional callback function to execute when the button is clicked 