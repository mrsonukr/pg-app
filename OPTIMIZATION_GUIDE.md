# APK Size Optimization Guide

## 🎯 Target: Reduce APK size from 60MB to ~20-30MB

## ✅ Optimizations Applied

### 1. **Android Build Optimizations**
- **ProGuard/R8**: Enabled code shrinking and obfuscation
- **Hermes Engine**: Enabled for better performance and smaller bundle
- **Split APKs**: Separate APKs for different CPU architectures (arm64, arm, x86)
- **Resource Shrinking**: Enabled to remove unused resources

### 2. **Dependency Optimizations**
- **Removed expo-file-system**: Replaced complex caching with simple Image component
- **Kept react-native-paper**: Still in use for UI components
- **Kept expo-linear-gradient**: Still in use for gradients

### 3. **Bundle Optimizations**
- **Asset Bundle Patterns**: Optimized to only include necessary assets
- **Tree Shaking**: Enabled to remove unused code
- **Console Log Removal**: Removes console.log in production builds
- **Metro Config**: Optimized for smaller bundles

### 4. **Code Optimizations**
- **Simplified CachedImage**: Removed file system dependency
- **ProGuard Rules**: Added specific rules for React Native and Expo

## 🚀 How to Build Optimized APK

### Option 1: Using the optimization script
```bash
npm run build:optimized
```

### Option 2: Manual build
```bash
npm run build:android
```

### Option 3: Direct EAS build
```bash
eas build --platform android --profile production
```

## 📊 Expected Results

- **Before**: ~60MB APK
- **After**: ~20-30MB APK (50-60% reduction)

## 🔧 Configuration Files Modified

1. **app.json**: Added Android optimizations
2. **eas.json**: Added ProGuard configuration
3. **metro.config.js**: Optimized bundling
4. **babel.config.js**: Added tree shaking
5. **proguard-rules.pro**: Added code shrinking rules
6. **package.json**: Removed unused dependencies
7. **components/CachedImage.tsx**: Simplified implementation

## 📱 Build Output

The build will create separate APKs for different architectures:
- `app-arm64-release.apk` (for modern devices)
- `app-arm-release.apk` (for older devices)
- `app-x86-release.apk` (for emulators)

## 🎯 Additional Tips

1. **Image Optimization**: Consider compressing PNG assets further
2. **Font Optimization**: Use only necessary font weights
3. **Icon Optimization**: Use vector icons where possible
4. **Code Splitting**: Consider lazy loading for non-critical components

## ⚠️ Important Notes

- All used dependencies (react-native-paper, expo-linear-gradient) are preserved
- App functionality remains unchanged
- Performance should improve due to Hermes engine
- Debug builds will still be larger than release builds
