# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native mobile application built with TypeScript. The project uses Expo SDK 54, React 19.1.0, and React Native 0.81.5.

## Development Commands

### Running the App

```bash
# Start development server with development client
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run on web
yarn web
```

### Code Quality

```bash
# Run ESLint
yarn lint

# Auto-fix ESLint issues
yarn lint:fix

# Check formatting with Prettier
yarn format:check

# Auto-format with Prettier
yarn format

# Type check with TypeScript
yarn type-check
```

## Code Architecture

### Entry Points
- `index.js` - Main entry point that registers the app component
- `App.tsx` - Root application component

### TypeScript Configuration
- Strict mode enabled
- Target: ESNext
- JSX: react-native
- Module resolution: Node

### ESLint Configuration
ESLint is configured with:
- TypeScript parser and plugin
- React and React Native plugins
- Key rules:
  - `react/react-in-jsx-scope`: off (React 17+ JSX transform)
  - `react/prop-types`: off (using TypeScript for type checking)
  - Unused vars as warnings (allows `_` prefix for ignored args)
  - Inline styles and color literals as warnings

### Prettier Configuration
Standard configuration with:
- Single quotes for JS/TS
- Double quotes for JSX
- 2-space indentation
- 80 character line width
- Trailing commas (ES5)

### Metro Bundler
Uses default Expo Metro configuration without customization.

## Development Notes

This is a bare Expo app (not managed workflow), which means:
- Native code is accessible in `ios/` and `android/` directories
- Requires running `yarn ios` or `yarn android` for native builds
- Uses Expo modules but allows custom native modules

When adding dependencies:
- Use `yarn add` (project uses Yarn, not npm)
- For native dependencies, may need to rebuild with `yarn ios` or `yarn android`
