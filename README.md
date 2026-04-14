# VIN Decoder

This is a test assignment: a web application for decoding vehicle identification numbers (VIN). The app allows users to enter a VIN and get detailed information about the vehicle, including variables and characteristics.

**Live Demo**: [https://andrii-deineka.github.io/VIN-Decoder/](https://andrii-deineka.github.io/VIN-Decoder/)

## Features

- **VIN Input**: Field for entering a 17-character VIN number.
- **Decoding**: Automatic VIN decoding using an API.
- **Results Display**: Display of vehicle variables and details in a user-friendly interface.
- **Copy to Clipboard**: Ability to copy results.
- **Responsive Design**: Works on various devices.

## Technologies

- **React**: Library for building user interfaces.
- **TypeScript**: Typed JavaScript for improved code reliability.
- **Vite**: Fast build tool and development server.
- **ESLint**: Linter for maintaining code quality.
- **React Router**: For navigation between pages.
- **Custom Hooks**: For state management and API calls.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vin-decoder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running

To run in development mode:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

For production build:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components (Button, Card, etc.)
├── hooks/               # Custom hooks (useFetch, useDebounce, etc.)
├── pages/               # App pages (Home, Variables, etc.)
├── router/              # Routing configuration
├── schemas/             # Validation schemas (VIN)
├── services/            # API services
├── styles/              # Global styles
└── utils/               # Utilities (clipboard, etc.)
```

## API

The app uses an external API for VIN decoding. Ensure the API is accessible and configured correctly in `services/api.ts`.

## Development

- Use `npm run lint` to check code with ESLint.
- Use TypeScript for typing.
- Follow component and hook structure for clean code.

## License

This project is a test assignment and not intended for commercial use.
