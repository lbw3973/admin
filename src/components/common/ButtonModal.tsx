"use client";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

interface ButtonModalProps {
  modalContents: IModalContents;
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface IModalContents {
  content: string;
  confirmText: string;
  cancelText?: string;
  confirmFn?: () => any;
  cancelFn?: () => any;
}

function ButtonModal({ modalContents, isOpen, setIsOpen, children }: ButtonModalProps) {
  const { content, confirmText, cancelText, confirmFn, cancelFn } = modalContents;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "initial";
  }, [isOpen]);

  const handleCancelButton = () => {
    setIsOpen(false);
    if (cancelFn) cancelFn();
  };
  const handleConfirmButton = () => {
    setIsOpen(false);
    if (confirmFn) confirmFn();
  };

  if (!isOpen) return <></>;
  return (
    <div className="fixed left-0 top-0 z-10 h-full w-full">
      <div className="modal_background" />
      <div className="popup flex flex-col justify-between">
        <div className="text-center">
          <h3 className={`mb-2 break-keep text-center text-xl font-bold ${children ? "pt-14" : "pt-12"}`}>{content}</h3>
          {children}
        </div>
        <div className="flex w-full gap-4">
          <button onClick={handleConfirmButton} className={`${cancelText ? "w-1/2" : "w-full"} popup-button`}>
            {confirmText}
          </button>
          {cancelText && (
            <button onClick={handleCancelButton} className="cancel-button">
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ButtonModal;
