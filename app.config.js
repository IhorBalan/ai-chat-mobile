const { readFileSync } = require('fs');
const { resolve } = require('path');

// Read environment variables from .env file
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '.env');
    const envFile = readFileSync(envPath, 'utf8');
    const env = {};

    envFile.split('\n').forEach((line) => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });

    return env;
  } catch (error) {
    console.warn('Could not load .env file:', error.message);
    return {};
  }
}

const env = loadEnv();

module.exports = {
  expo: {
    name: 'ai-chat-mobile',
    slug: 'ai-chat-mobile',
    version: '1.0.0',
    scheme: 'aichatmobile',
    platforms: ['ios', 'android', 'web'],
    orientation: 'portrait',
    userInterfaceStyle: 'dark',
    splash: {
      resizeMode: 'contain',
      backgroundColor: '#080F1A',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.aichatmobile.app',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#080F1A',
      },
      package: 'com.aichatmobile.app',
    },
    web: {
      bundler: 'metro',
    },
    plugins: ['expo-router'],
    extra: {
      openaiApiKey: env.OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    },
  },
};
