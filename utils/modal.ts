import styls from "@/components/Popup/index.module.css";

let currentPopup: null = null; // 追踪当前显示的弹窗

// 定义模态框函数
export function showModal(
  type: string | number,
  title: string | null,
  message: string | null,
  close: () => void,
  confirm: () => void,
  cancel: () => void,
  isCancel: any,
  cancelText: string | null,
  confirmText: string | null
) {
  // 如果有当前弹窗，先移除
  if (currentPopup) {
    document.body.removeChild(currentPopup);
    currentPopup = null;
  }
  const popupMain = document.createElement("div");
  popupMain.className = styls.popupMain;

  const mask = document.createElement("div");
  mask.className = styls.mask;

  const popupHolder = document.createElement("div");
  popupHolder.className = `${styls.popupHolder} ${styls[type]}`;

  if (close) {
    const closePopup = document.createElement("i");
    closePopup.className = styls.closePopup;
    closePopup.onclick = () => {
      close();
      document.body.removeChild(popupMain);
    };
    popupHolder.appendChild(closePopup);
  }

  const popupBlock02 = document.createElement("div");
  popupBlock02.className = styls.popupBlock02;

  const textBlock = document.createElement("div");
  textBlock.className = styls.textBlock;

  const closePopup2 = document.createElement("button");
  closePopup2.className = styls.closePopup2;

  const h5 = document.createElement("h5");
  h5.textContent = title;

  const p = document.createElement("p");
  p.textContent = message;

  const confirmBtn = document.createElement("a");
  confirmBtn.href = "#";
  confirmBtn.className = styls.confirmBtn;
  confirmBtn.onclick = () => {
    confirm();
    document.body.removeChild(popupMain);
  };
  confirmBtn.textContent = confirmText ? confirmText : "Confirm";

  const cancelBtn = document.createElement("a");
  cancelBtn.href = "#";
  cancelBtn.className = styls.cancelBtn;
  if (cancel) {
    cancelBtn.onclick = () => {
      cancel();
      document.body.removeChild(popupMain);
    };
  }
  cancelBtn.textContent = cancelText ? cancelText : "Cancel";

  // 添加到文档中
  textBlock.appendChild(closePopup2);
  textBlock.appendChild(h5);
  textBlock.appendChild(p);
  textBlock.appendChild(confirmBtn);
  if (isCancel) {
    textBlock.appendChild(cancelBtn);
  }
  popupBlock02.appendChild(textBlock);
  popupHolder.appendChild(popupBlock02);
  mask.appendChild(popupHolder);
  popupMain.appendChild(mask);
  document.body.appendChild(popupMain);
}
