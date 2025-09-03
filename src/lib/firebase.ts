// src/lib/firebase.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";

// Firebase Web config (from Firebase Console → Project settings → Web app)
const firebaseConfig = {
  apiKey: "AIzaSyAKSI_3ZFOAm_oU0SxbWK22CvHWMS-tl00",
  authDomain: "heartwing-b14a0.firebaseapp.com",
  projectId: "heartwing-b14a0",
  storageBucket: "heartwing-b14a0.firebasestorage.app",
  messagingSenderId: "445413504107",
  appId: "1:445413504107:web:98ee8d4e43549a178e2d2e",
  measurementId: "G-2K9L4CBQF5"
};

// Ensure we initialize only once
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Build an Auth instance with best-effort native persistence.
// If the RN entrypoint isn't present, we fall back to getAuth(app) (non-persistent).
function buildAuth(): Auth {
  if (Platform.OS === "web") {
    return getAuth(app);
  }
  try {
    // Runtime require so Metro won't try to resolve it if it's missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getReactNativePersistence } = require("firebase/auth/react-native");
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (err) {
    console.warn(
      "[firebase] 'firebase/auth/react-native' not found; falling back to non-persistent auth.",
      err
    );
    return getAuth(app);
  }
}

export const auth = buildAuth();
