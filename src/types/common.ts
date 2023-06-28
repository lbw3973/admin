import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IModalContent {
  content: string;
  confirmText: string;
  confirmFn: () => void;
}
export interface ButtonModalProps {
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
