import { AUTH0_LOGIN_URL } from "./constant";
import { showModal } from "./modal";

export function getQueryParam(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

export const LoginDialog = (message: string) => {
  showModal(
    "warning",
    "Please sign in first",
    message,
    () => {
      // window.location.href = AUTH0_LOGIN_URL;
      localStorage.setItem("redirect_url", window.location.href);
    },
    () => {
      window.location.href = AUTH0_LOGIN_URL;
      localStorage.setItem("redirect_url", window.location.href);
    },
    () => console.log("Cancel"),
    false,
    "Cancel",
    "Confirm"
  );
};
