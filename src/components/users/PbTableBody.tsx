import ModalLayout from "../common/ModalLayout";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ButtonModal from "../common/ButtonModal";
import { IUserInfoData } from "@/types/users";
import { USER_TYPE } from "@/constants/enum";
import { setAdminPermission as setPermission, withdrawUser } from "@/app/apis/users";
import Image from "next/image";

const TH_STYLE = "rounded-[1px] h-[52px] border-r-1 border-[#E0E0E0] font-normal py-1 px-2";

function PbTableBody({
  item,
  index,
  userType,
  page,
}: {
  item: IUserInfoData;
  index: number;
  userType: USER_TYPE;
  page: number;
}) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isBCardOpen, setIsBCardOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    content: "",
    confirmText: "",
    cancelText: "",
    confirmFn: () => void 0,
    cancelFn: () => void 0,
  });
  const queryClient = useQueryClient();

  const { mutate: withdraw } = useMutation(withdrawUser, {
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.refetchQueries([userType]);
    },
    onError: () => {},
  });

  const { mutate: permission } = useMutation(setPermission, {
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.refetchQueries([userType]);
    },
    onError: () => {},
  });

  const handleSetAdmin = (e: MouseEvent<HTMLElement>) => {
    const buttonEl = e.target as HTMLButtonElement;
    if (buttonEl.tagName.toLowerCase() !== "button") {
      return;
    }
    const accept = buttonEl.id === "Admin";

    setModalContent({
      content: `${buttonEl.innerText}로 권한 변경하시겠습니까?`,
      confirmText: "확인",
      cancelText: "취소",
      confirmFn: () => {
        permission({ id: item.id, accept: accept });
      },
      cancelFn: () => {
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  const handleWithdraw = () => {
    setModalContent({
      content: "회원 탈퇴 하시겠습니까?",
      confirmText: "확인",
      cancelText: "취소",
      confirmFn: () => {
        withdraw({ type: userType, id: item.id });
      },
      cancelFn: () => {
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <tbody className="h-[52px] border-t-1 border-[#E0E0E0] text-center">
        <tr>
          <td className={`${TH_STYLE} w-[52px] border-l-1`}>{page * 10 + index}</td>
          <td className={`${TH_STYLE} w-[132px] border-l-1`}>{item.createdAt}</td>
          <td className={`${TH_STYLE} w-[210px]`}>{item.email}</td>
          <td className={`${TH_STYLE} w-[120px]`}>{item.name}</td>
          <td className={`${TH_STYLE} w-[200px]`}>{item.phoneNumber.replace(/(\d{3})(\d{4})(\d)/, "$1-$2-$3")}</td>
          <td className={`${TH_STYLE} w-[88px]`}>{userType === USER_TYPE.PB ? "PB" : "투자자"}</td>
          <td
            className={`${TH_STYLE} flex w-[200px] items-center justify-center gap-5 px-2 text-sm`}
            onClick={handleSetAdmin}
          >
            {item.branchName}
          </td>
          <td className={`${TH_STYLE} w-[60px]`}>
            <button
              onClick={() => setIsBCardOpen(true)}
              className="h-full w-20 rounded-[8px] bg-[#2A4457] text-sm text-white"
            >
              명함 확인
            </button>
          </td>
          <td className={`${TH_STYLE} w-[60px]`}>
            <button
              onClick={handleWithdraw}
              className="h-7 w-20 rounded-[8px] border-1 border-[#355C64] text-sm font-bold text-[#355C64] hover:bg-[#355C64] hover:text-white"
            >
              탈퇴처리
            </button>
          </td>
        </tr>
      </tbody>

      {isBCardOpen && (
        <ModalLayout handleCloseModal={() => setIsBCardOpen(false)}>
          <p className="mb-4 font-bold">{item.name} 의 명함</p>
          <Image className="max-h-[400px]" src={item.businessCard} alt="businessCard" width={500} height={400} />
        </ModalLayout>
      )}
      {isCardOpen && (
        <ModalLayout handleCloseModal={() => setIsCardOpen(false)}>
          {/* <Image src={item.businessCard} alt="businessCard" width={800} height={800} /> */}
        </ModalLayout>
      )}
      {isModalOpen && <ButtonModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalContents={modalContent} />}
    </>
  );
}

export default PbTableBody;
