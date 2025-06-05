
# Frag App Development

This application is built using React Native and Expo with Realm as the local offline database. 

**Note that **Expo Go is not compatible with Realm**, as it requires native modules. To run the application, a **custom development build** must be created.

---

## Technology Stack

- React Native (via Expo)
- Realm (for offline-first local database)
- Expo Dev Client
- Android (emulator or physical device)

---

## Prerequisites

Ensure the following tools and environments are installed:

- Node.js (version 14 or newer)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (with Emulator or a physical device with USB debugging enabled)
- Java Development Kit (JDK 11 or newer)
- ADB (installed with Android Studio)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://gitlab.com/mineexcellence/me-fragmentation-image-analysis.git
cd me-fragmentation-image-analysis
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Expo Dev Client

```bash
npx expo install expo-dev-client
```

### 4. Install Realm

```bash
npm install realm
```

---

## Running the App Without Expo Go

### Android (Emulator or Physical Device)

#### Step 1: Start an Android Emulator or Connect a Physical Device

* To use an emulator: Open Android Studio → `Tools > Device Manager` → Start a virtual device
* To use a physical device: Connect via USB and ensure USB debugging is enabled

#### Step 2: Build the Development Client

```bash
npx expo run:android
```

This command builds the application with Realm support and installs it directly onto the connected device or emulator.

#### Step 3: Start Metro Bundler

```bash
npx expo start --dev-client
```

This starts the Metro bundler and connects it to the custom development build.

---

## Rebuilding Notes

Whenever native modules (like Realm) are added or removed, rebuild the app using:

```bash
npx expo run:android
```

---

## Troubleshooting

| Issue               | Solution                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `Realm not found`   | Ensure you are not using Expo Go. Use a dev build.               |
| App not opening     | Verify that the device or emulator is properly running           |
| Metro not connected | Ensure `npx expo start --dev-client` is active                   |
| Build failed        | Check Java JDK version (must be 11 or newer) and reinstall Realm |

---
