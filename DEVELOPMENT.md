# Development Setup

## Warning: NODE_ENV=production breaks npm install

If `NODE_ENV` is set to `production` in your shell, running `npm install` will silently skip all `devDependencies`. This causes confusing errors like:

```
Error: Cannot find module '@react-native/metro-config'
```

even though the package is correctly listed in `package.json`.

### Fix

Either unset `NODE_ENV` before installing:

```bash
unset NODE_ENV
npm install
```

Or force npm to include devDependencies regardless of the environment:

```bash
npm install --include=dev
```

You can check your current value with:

```bash
echo $NODE_ENV
```

If it prints `production`, use one of the fixes above before running any `npm install`.

---

## Warning: react-native-reanimated is hard-pinned to 3.6.2

`react-native-reanimated` is pinned to exactly `3.6.2` in `package.json` (no caret). Do not bump it without also upgrading React Native.

Versions 3.16.0 and above require **React Native 0.78 or newer**. This project uses React Native 0.72.4. Installing a newer version will cause the Android build to fail with:

```
[Reanimated] Unsupported React Native version. Please use 78. or newer.
```

---

## Warning: gesture-handler, screens, and safe-area-context are hard-pinned

These three packages are pinned to exact versions compatible with React Native 0.72.4:

| Package | Pinned version | Why |
|---|---|---|
| `react-native-gesture-handler` | `2.13.4` | 2.14+ uses `BaseReactPackage` (RN 0.73+ only) |
| `react-native-screens` | `3.27.0` | 3.28+ uses `BaseReactPackage` (RN 0.73+ only) |
| `react-native-safe-area-context` | `4.7.4` | 4.8+ requires kotlin-stdlib 1.8.x, incompatible with this project's Kotlin compiler |

Do not bump any of these without also upgrading React Native to 0.73+. The Android build will fail with `Unresolved reference: BaseReactPackage` or Kotlin metadata version errors.
