import styles from "./index.module.css";

let currentToast: HTMLDivElement | null = null;

type ToastType = "success" | "info" | "warning" | "error";

export function showToast(
  type: ToastType,
  message: string,
  duration: number = 2000
) {
  // 如果有当前弹窗，先移除
  if (currentToast) {
    document.body.removeChild(currentToast);
    currentToast = null;
  }

  const toastMain = document.createElement("div");
  toastMain.className = styles.popupMain;

  const mask = document.createElement("div");
  mask.className = styles.mask;

  const toastHolder = document.createElement("div");
  toastHolder.className = `${styles.popupHolder} ${styles[type]}`;

  const messageDiv = document.createElement("div");
  messageDiv.className = `${styles.message} ${styles[type]}`;
  messageDiv.textContent = message;

  toastHolder.appendChild(messageDiv);
  mask.appendChild(toastHolder);
  toastMain.appendChild(mask);
  document.body.appendChild(toastMain);
  currentToast = toastMain;

  //   自动关闭
  setTimeout(() => {
    if (currentToast) {
      document.body.removeChild(currentToast);
      currentToast = null;
    }
  }, duration);
}
