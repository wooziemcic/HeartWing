import { Slot } from "expo-router";
import { GameProvider } from "../src/store/GameContext";

export default function RootLayout() {
  return (
    <GameProvider>
      <Slot />
    </GameProvider>
  );
}
