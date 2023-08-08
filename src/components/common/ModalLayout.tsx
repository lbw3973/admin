import { ReactNode } from "react";

export interface IModalLayoutProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  return (
    <div className="fixed left-0 top-0 ">
      <div className="modal_background " />
      <section className="modal flex min-h-[500px] w-[700px] flex-col">
        <button
          className="border absolute right-6 rounded-md border-1 px-4 py-2 font-bold hover:bg-gray-heavy hover:text-white"
          onClick={handleCloseModal}
        >
          닫기
        </button>
        {children}
      </section>
    </div>
  );
}

export default ModalLayout;
