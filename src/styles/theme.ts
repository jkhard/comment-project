import type { ThemeConfig } from "antd";
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#2f5d4a",
    colorLink: "#2f5d4a",
    borderRadius: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    colorTextBase: "#1e2420",
    colorBorder: "#d9ded4",
  },
  components: {
    Layout: {
      headerBg: "#ffffff",
      bodyBg: "#f2f4ef",
      siderBg: "#1f3f32",
    },
    Menu: {
      darkItemBg: "#1f3f32",
      darkItemSelectedBg: "#2f5d4a",
    },
  },
};