# TrueFormTSFE

A **React Native TypeScript Frontend Application** powered by Expo and React Navigation. This project delivers a smooth mobile and web experience with type safety and modern tooling.

---

## 🚀 Getting Started

This project uses **React Native**, **TypeScript**, and **Expo** for rapid development and cross-platform deployment.

### ✅ Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- npm (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (optional, but helpful)

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/EvolveU-FSD/c14-p3-trueform-frontend
```

Install dependencies (including peer dependencies):

```bash
npm install --legacy-peer-deps
```

> **Note:** Use `--legacy-peer-deps` to resolve circular peer dependency issues between Expo, React, and TypeScript packages.

---

## ⚙️ Environment Variables

Copy `.env.example` or `.env.template` to `.env` and set your API keys and URLs.  
For local backend testing, see the Ngrok section below.

Example:

```
EXPO_PUBLIC_API_BASE_URL=https://your-ngrok-url.ngrok.io
```

---

## 🛠 Development Commands

- `npm run start` - Start the Expo development server
- `npm run android` - Run the app on an Android emulator or connected device
- `npm run ios` - Run the app on an iOS simulator or connected device
- `npm run dev` - Run the app in an Expo tunnel that can be accessed from the outside world. Join from your local Expo Go app.
- `npm run format` - Format code using Prettier
- `npm run lint` - Lint and auto-fix code using ESLint

---

## 📚 Dependencies & Tech Stack

- **React Native** (`react-native`)
- **Expo** (`expo`) - Version: `~53.0.15`
- **React Navigation** (`@react-navigation/*`)
- **Stripe** (`@stripe/stripe-react-native`)
- **Firebase** (`firebase`)
- **Axios** (`axios`)
- **TypeScript** (`typescript`)
- **Prettier** & **ESLint** for code style

> **Expo Version:** This project uses Expo SDK `~53.0.15`. Ensure your global Expo CLI matches this version for best compatibility.

---

## 🧪 Testing

Testing is currently performed at the API level in the backend.  
No frontend unit or integration tests exist yet.

---

## 📁 Folder Structure

```
TrueFormTSFE/
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── context/         # React context providers
│   ├── data/            # Static data
│   ├── navigation/      # Navigation setup
│   ├── screens/         # Screen components
│   ├── services/        # API and business logic
│   ├── styles/          # Style definitions
│   ├── theme/           # Theme context
│   ├── types/           # TypeScript definitions
│   └── ...
├── App.tsx              # Main application component
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── .env                 # Environment variables
```

---

## 🚦 Authentication & User Flow

- Uses Firebase for user registration and login.
- Guest checkout is supported.
- User profile and addresses are managed via API.

---

## 📏 Measurement Features

- Manual input of measurements via [`ManualMeasurementInput`](src/screens/ManualMeasurementInput.tsx)
- Body scan measurement via [`BodyScanScreen`](src/screens/BodyScanScreen.tsx)
- Measurements are saved and selectable during checkout.

---

## 🎨 Product Customization Flow

- Customization options are fetched and managed via [`CustomizationService`](src/services/customization.service.ts)
- Users select product customizations during the order process.
- Customizations are linked to categories and products.
