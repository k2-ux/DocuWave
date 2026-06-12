# DocuWave

DocuWave is a React Native mobile application built for documentary enthusiasts. The goal of the app is to give users a single place to discover new documentaries, keep track of what they've watched, and curate a personal watchlist — whether they're online or offline.

The project was built to explore a hybrid storage architecture: user data lives first in a local SQLite database (so the app works fully offline), then gets pushed to Firebase Firestore whenever a network connection is available. This means the app is always responsive and never blocks on a network call for core functionality.

---

## Functionalities

### Offline-first local storage (SQLite)
The Watchlog screen stores documentary entries — title, watch status, language, and year — directly in a SQLite database on the device using `react-native-sqlite-storage`. The app reads and writes to this database instantly without needing any network connection, so it works completely offline.

### Cloud sync (Firebase Firestore)
When the device is online, the local watchlog is automatically synced to Firestore under the authenticated user's document. This means data is backed up to the cloud and can be recovered if the app is reinstalled. Network status is checked with `@react-native-community/netinfo` before any sync attempt.

### Documentary discovery (TMDB API)
The Explore screen fetches documentaries from The Movie Database (TMDB) API, filtering results to genre ID 99 (Documentary). Results are paginated, cached in component state across pages, and searchable by title using a local filter over the loaded dataset.

### Watchlist (Redux)
From the Explore screen, users can bookmark any documentary with a single tap. These bookmarks are stored in Redux state, making reads instantaneous and keeping the UI reactive without extra network calls. The watchlist persists for the session and is accessible from the dedicated Watchlist screen.

### Authentication (Firebase Auth)
Users sign up and sign in with email and password via Firebase Authentication. An auth state listener at the root navigator level routes users to the correct screen (login or home) on app launch, and handles session persistence automatically.

### Network awareness
The app uses `@react-native-community/netinfo` to detect connectivity changes. Cloud sync only runs when the device is connected, preventing failed network requests from surfacing as errors to the user.

---

## Features at a glance

- **Discover** — Browse documentaries from TMDB with search and per-card bookmark toggle
- **Watchlist** — Instantly save/remove films with a bookmark button; view them in a poster grid
- **Watchlog** — Add personal entries with watch status (watched / will watch), language, and year
- **Offline storage** — All watchlog data is stored locally in SQLite; works without internet
- **Cloud backup** — Watchlog syncs to Firestore automatically when online
- **Authentication** — Email/password sign-up and sign-in via Firebase Auth

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native 0.72.4 |
| Navigation | React Navigation 6 (Stack + Drawer) |
| State management | Redux Toolkit |
| Local database | react-native-sqlite-storage |
| Cloud database | Firebase Firestore |
| Authentication | Firebase Auth |
| API | TMDB (The Movie Database) |
| Icons | react-native-vector-icons (Ionicons) |

---

## Project Structure

```
src/
├── api/
│   └── tmdb.js               # TMDB fetch helpers
├── components/
│   ├── theme.js              # Colour tokens
│   ├── Header.js             # Shared screen header
│   ├── FormComponent.js      # Add/edit documentary bottom sheet
│   ├── CustomDrawer.js       # Sidebar drawer content
│   ├── CustomPicker.js       # Styled picker wrapper
│   ├── createTables.js       # SQLite table initialisation
│   └── fetchDataFromTable.js
├── Navigators/
│   ├── LoginNavigator.js     # Root stack (auth gate)
│   └── DrawerNavigator.js    # Authenticated drawer
├── Redux/
│   ├── WatchListSlice.js     # Watchlist add/remove actions
│   └── Store/store.js
└── Screens/
    ├── Login.js
    ├── Registration.js
    ├── HomeScreen.js         # Personal watchlog (SQLite)
    ├── ExploreMovies.js      # TMDB discovery + search
    ├── DocumentaryDetail.js  # Film detail view
    └── WatchList.js          # Saved watchlist grid
```

---

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn
- Android Studio + Android SDK
- Java 17 (JDK)

### 1. Clone and install

```bash
git clone <repo-url>
cd DocuWave
yarn install
```

### 2. Environment variables

Create a `.env` file in the project root (this file is gitignored — never commit it):

```env
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Get a free API key at [themoviedb.org](https://www.themoviedb.org/settings/api).

### 3. Firebase setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Enable **Firestore Database**
4. Download `google-services.json` and place it at `android/app/google-services.json`

### 4. Run on Android

```bash
# Start Metro bundler
yarn start --reset-cache

# In a separate terminal
yarn android
```

---

## Android Build Notes

The following configuration is required for a successful build with this dependency set.

**`android/build.gradle`**
- `compileSdkVersion = 34` and `targetSdkVersion = 34`
- `kotlinVersion = "1.8.22"` with KGP classpath entry
- `firebase-auth` forced to `22.1.2` (fixes D8 dexer crash on newer versions)
- Kotlin stdlib forced to `1.8.22` across all subprojects

**`android/gradle.properties`**
- `kotlin.jvm.target.validation.mode=IGNORE` — suppresses the Kotlin/Java JVM target mismatch between `kotlinc` (17) and `javac` (11)

> See `DEVELOPMENT.md` for a full breakdown of past build issues and their fixes.

---

## Dependency Notes

The packages below are hard-pinned. **Do not upgrade them** without first upgrading React Native.

| Package | Pinned version | Reason |
|---|---|---|
| `react-native-reanimated` | `3.6.2` | Newer versions require RN 0.78+ |
| `react-native-gesture-handler` | `2.13.4` | RN 0.72 compatibility |
| `react-native-screens` | `3.27.0` | RN 0.72 compatibility |
| `react-native-safe-area-context` | `4.7.4` | RN 0.72 compatibility |

### Installing packages

Always use Yarn for this project. **Do not run `npm install` with `NODE_ENV=production`** — it silently skips `devDependencies` (including `react-native-dotenv`), which breaks the Metro bundler.

```bash
# Correct
yarn add <package>
yarn install

# Will break the build
NODE_ENV=production npm install
```

---

## License

MIT
