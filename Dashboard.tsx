/** @import must precede all other statements */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /**
   * Tailwind CSS theme for Emergency Resource Finder
   * tailwind.config.ts expects the following color variables to be expressed as HSL values.
  */
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 12%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 12%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 12%;

    --primary: 0 84% 60%;
    --primary-foreground: 0 0% 100%;

    --secondary: 219 14% 63%;
    --secondary-foreground: 240 10% 12%;

    --muted: 210 11% 91%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 0 84% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 219 14% 88%;
    --input: 219 14% 95%;
    --ring: 0 84% 60%;

    --radius: 0.75rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 10% 12%;
    --sidebar-primary: 0 84% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 219 14% 91%;
    --sidebar-accent-foreground: 240 10% 12%;
    --sidebar-border: 219 14% 88%;
    --sidebar-ring: 0 84% 60%;
  }

  .dark {
    --background: 240 10% 9%;
    --foreground: 0 0% 98%;

    --card: 240 5% 16%;
    --card-foreground: 0 0% 98%;

    --popover: 240 5% 16%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 84% 60%;
    --primary-foreground: 0 0% 100%;

    --secondary: 219 14% 45%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 5% 35%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 0 84% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 240 5% 25%;
    --input: 240 5% 22%;
    --ring: 0 84% 60%;

    --sidebar-background: 240 5% 12%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 0 84% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 5% 22%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 240 5% 22%;
    --sidebar-ring: 0 84% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

  :where(p, span, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th) {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  pre,
  code {
    overflow-x: auto;
    white-space: pre;
  }
}
