# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 portfolio website using the App Router, TypeScript, and Tailwind CSS v4. The project was bootstrapped with create-next-app and uses Turbopack for optimized builds.

## Common Commands

```bash
# Development
npm run dev          # Start development server with Turbopack on http://localhost:3000

# Build & Production
npm run build        # Build for production with Turbopack
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Font**: Geist and Geist Mono (auto-optimized via next/font)

### Project Structure
- `/app` - App Router pages and components
  - `layout.tsx` - Root layout with metadata and font configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles and Tailwind directives
  - `/components` - Reusable components (ThemeToggle, ThemeScript)
- `/public` - Static assets

### Key Patterns
- **Theme Support**: Dark mode implementation via ThemeScript component and CSS variables
- **TypeScript**: Strict mode enabled with path alias `@/*` for project root imports
- **Components**: Functional components with TypeScript interfaces for props
- **Metadata**: SEO metadata configured in layout.tsx with Open Graph and Twitter cards

### ESLint Configuration
Uses Next.js Core Web Vitals and TypeScript rules via @eslint/eslintrc FlatCompat for ESLint v9 compatibility.