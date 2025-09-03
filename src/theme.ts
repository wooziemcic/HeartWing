// src/theme.ts
export const colors = {
  bg: "#0A0B0E",
  card: "#171922",
  surface: "#10131A",
  border: "#232737",
  text: "#FFFFFF",
  dim: "rgba(255,255,255,0.75)",
  // accents
  accent: "#E847AE",         // pink/magenta
  accent2: "#4AC0FF",        // cyan for verified
  warn: "#F2B01E",           // warm yellow
  like: "#E847AE",
  pass: "#6B7280",
};

export const space = {
  xs: 6, sm: 10, md: 14, lg: 20, xl: 28, xxl: 40,
};

export const radii = {
  sm: 10, md: 16, lg: 22, xl: 28,
};

export const gradientCard = ["#241A23", "#13141B"];
export const gradientBg = ["#0B0A0F", "#121423", "#0B0A0F"];

// Soft, stacked shadow used on cards / floating buttons
export const shadow = {
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
};
