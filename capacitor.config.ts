import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ecotrack.app',
  appName: 'EcoTrack',
  webDir: 'dist/EcoTrack/browser',
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    },
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
