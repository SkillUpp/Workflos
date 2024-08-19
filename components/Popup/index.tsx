import styls from "./index.module.css";

interface IModalProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  isCancel?: boolean;
  close: () => void;
  confirm: () => void;
  cancel?: () => void;
  cancleText?: string;
  confirmText?: string;
}

const Modal = (props: IModalProps) => {
  const {
    type,
    title,
    message,
    cancel,
    close,
    confirm,
    cancleText,
    confirmText,
    isCancel,
  } = props;
  return (
    <div className={styls.popupMain}>
      <div className={styls.mask}>
        <div className={`${styls.popupHolder} ${styls[type]}`}>
          <i className={styls.closePopup} onClick={() => close()}></i>
          <div className={styls.popupBlock02}>
            <div className={styls.textBlock}>
              <button className={styls.closePopup2}></button>
              <h5>{title}</h5>
              <p>{message}</p>
              <a
                href="#"
                className={styls.confirmBtn}
                onClick={() => confirm()}
              >
                {confirmText ? confirmText : "Confirm"}
              </a>
              {isCancel && (
                <a
                  href="#"
                  className={styls.cancelBtn}
                  onClick={() => cancel && cancel()}
                >
                  {cancleText ? cancleText : "Cancel"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
