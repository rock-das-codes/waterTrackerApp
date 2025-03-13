const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);

// Apply both configurations correctly
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });
const finalConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

module.exports = finalConfig;
