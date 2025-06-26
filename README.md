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
git clone https://github.com/EvolveU-FSD/c14-p3-true-form-backend
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

Start in **web mode** (recommended for development):

```bash
npx expo start --web
```

This will launch the app in your browser at [http://localhost:19006](http://localhost:19006).

---

## 📁 Project Structure

```
TrueFormTSFE/
├── src/
│   ├── screens/       # Screen components
│   ├── types/         # TypeScript definitions
│   └── ...
├── App.tsx            # Main application component
├── package.json       # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

---

## ✨ Features

- ✅ **TypeScript** support for safer and cleaner code
- 🔄 **React Navigation** for intuitive routing
- 📱 **Expo** for cross-platform development
- 🌐 **Web support** for easier debugging and testing

---

## 🛠 Development Commands

- `npm run android` - Run the app on an Android emulator or connected device
- `npm run ios` - Run the app on an iOS simulator or connected device
- `npm run dev` - Run the app in an Expo tunnel that can be accessed from the outside world. Join from your local Expo Go app.

---

## 🌐 Testing with Ngrok Tunnel

To test the app on physical devices while running your backend locally, you'll need to set up an ngrok tunnel.

### Setting up Ngrok on Windows

1. Download and install ngrok from the official website:
   - Visit [https://ngrok.com/download](https://ngrok.com/download)
   - Download the Windows version
   - Extract the ngrok.exe file
   - Add ngrok to your Windows PATH or move it to a location like `C:\Windows`

2. Open Command Prompt (cmd.exe) - **Note: Do not use Git Bash**:
   ```cmd
   # Start your backend server first (default port 3000)
   # Then in a new CMD window, run:
   ngrok http https://localhost:3000
   ```
