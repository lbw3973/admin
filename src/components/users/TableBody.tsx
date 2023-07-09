import ModalLayout from "../common/ModalLayout";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ButtonModal from "../common/ButtonModal";
import { IUserInfoData } from "@/types/users";
import { USER_TYPE } from "@/constants/enum";
import { setAdminPermission as setPermission, withdrawUser } from "@/app/apis/users";

const TH_STYLE = "rounded-[1px] h-[52px] border-r-1 border-[#E0E0E0] font-normal py-1 px-2";

function TableBody({
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
          <td className={`${TH_STYLE} w-[210px]`}>{item.email}</td>
          <td className={`${TH_STYLE} w-[120px]`}>{item.name}</td>
          <td className={`${TH_STYLE} w-[200px]`}>{item.phoneNumber.replace(/(\d{3})(\d{4})(\d)/, "$1-$2-$3")}</td>
          <td className={`${TH_STYLE} w-[88px]`}>{userType === USER_TYPE.PB ? "PB" : "투자자"}</td>
          <td
            className={`${TH_STYLE} flex w-[240px] items-center justify-center gap-5 px-2 text-sm`}
            onClick={handleSetAdmin}
          >
            {userType === USER_TYPE.USER ? (
              <>
                <button
                  id="User"
                  className={`h-7 w-[72px] rounded-[8px] ${
                    item.isAdmin ? "border-1 border-[#335C64] bg-white text-[#355C64]" : "bg-[#335C64] text-white"
                  }`}
                >
                  유저
                </button>
                <button
                  id="Admin"
                  className={`h-7 w-[72px] rounded-[8px] ${
                    !item.isAdmin ? "border-1 border-[#335C64] bg-white text-[#355C64]" : "bg-[#335C64] text-white"
                  }`}
                >
                  관리자
                </button>
              </>
            ) : (
              <p className="text-xs">PB에게는 관리자 권한을 부여할 수 없습니다.</p>
            )}
          </td>
          <td className={`${TH_STYLE} w-[181px]`}>
            <button
              onClick={handleWithdraw}
              className="h-7 w-40 rounded-[8px] border-1 border-[#355C64] text-sm font-bold text-[#355C64] hover:bg-[#355C64] hover:text-white"
            >
              탈퇴처리
            </button>
          </td>
        </tr>
      </tbody>
      {isCardOpen && (
        <ModalLayout handleCloseModal={() => setIsCardOpen(false)}>
          {/* <Image src={item.businessCard} alt="businessCard" width={800} height={800} /> */}
        </ModalLayout>
      )}
      {isModalOpen && <ButtonModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalContents={modalContent} />}
    </>
  );
}

export default TableBody;
