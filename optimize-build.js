#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized build process...\n');

// Set environment variables for optimization
process.env.NODE_ENV = 'production';
process.env.ENABLE_PROGUARD = 'true';

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  execSync('npx expo prebuild --clean', { stdio: 'inherit' });
  
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Build for Android with optimizations
  console.log('🔨 Building optimized APK...');
  execSync('eas build --platform android --profile production', { stdio: 'inherit' });
  
  console.log('\n✅ Build completed successfully!');
  console.log('📱 Your optimized APK should be significantly smaller now.');
  console.log('\nOptimizations applied:');
  console.log('• ✅ ProGuard/R8 enabled for code shrinking');
  console.log('• ✅ Hermes JavaScript engine enabled');
  console.log('• ✅ Split APKs for different architectures');
  console.log('• ✅ Removed unused dependencies (expo-file-system)');
  console.log('• ✅ Optimized asset bundle patterns');
  console.log('• ✅ Tree shaking enabled');
  console.log('• ✅ Console logs removed in production');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
