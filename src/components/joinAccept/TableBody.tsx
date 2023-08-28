import { IJoinListData } from "@/types/joinAccept";
import ModalLayout from "../common/ModalLayout";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AccpetJoinPB } from "@/app/apis/joinAccept";
import ButtonModal from "../common/ButtonModal";
import Image from "next/image";

const TH_STYLE = "rounded-[1px] h-[52px] border-r-1 border-[#E0E0E0] font-normal py-1 px-2";

function TableBody({ item, index, page }: { item: IJoinListData; index: number; page: number }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [message, setMessage] = useState("");
  const [modalContent, setModalContent] = useState({
    content: "",
    confirmText: "",
    cancelText: "",
    confirmFn: () => void 0,
    cancelFn: () => void 0,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation(AccpetJoinPB, {
    onSuccess: () => {
      queryClient.invalidateQueries(["joinList"]);
    },
    onError: () => {},
  });

  const handleAccopt = () => {
    setModalContent({
      content: `승인 하시겠습니까?`,
      confirmText: "확인",
      cancelText: "취소",
      confirmFn: () => {
        mutate({ approve: true, id: item.id.toString() });
      },
      cancelFn: () => {
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  const handleRefuse = () => {
    mutate({ approve: false, id: item.id.toString(), msg: message });
  };

  const handleChangeMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <tbody className="h-[52px] border-t-1 border-[#E0E0E0] text-center">
        <tr>
          <td className={`${TH_STYLE} w-[52px] border-l-1`}>{page * 10 + index}</td>
          <td className={`${TH_STYLE} w-[200px]`}>{item.email}</td>
          <td className={`${TH_STYLE} w-[90px]`}>{item.name}</td>
          <td className={`${TH_STYLE} w-[170px]`}>{item.phoneNumber.replace(/(\d{3})(\d{4})(\d)/, "$1-$2-$3")}</td>
          <td className={`${TH_STYLE} w-[240px]`}>{item.branchName}</td>
          <td className={`${TH_STYLE} w-[120px]`}>
            <button
              onClick={() => setIsCardOpen(true)}
              className="h-full w-full rounded-[8px] bg-[#2A4457] text-sm text-white"
            >
              명함 확인
            </button>
          </td>
          <td className={`${TH_STYLE} grid w-[212px] grid-cols-2 gap-2 px-2 text-sm text-white`}>
            <button id="Accept" onClick={handleAccopt} className="rounded-[8px] bg-[#27508C]">
              승인
            </button>
            <button
              id="Reject"
              onClick={() => {
                setIsApprove(true);
              }}
              className="rounded-[8px] bg-[#642626]"
            >
              거절
            </button>
          </td>
        </tr>
      </tbody>
      {isCardOpen && (
        <ModalLayout handleCloseModal={() => setIsCardOpen(false)}>
          <p className="mb-4 font-bold">{item.name} 의 명함</p>
          <Image className="max-h-[400px]" src={item.businessCard} alt="businessCard" width={500} height={400} />
        </ModalLayout>
      )}
      {isApprove && (
        <ModalLayout handleCloseModal={() => setIsApprove(false)}>
          <p className="mb-2 font-bold">{item.name} 의 가입을 거절하시겠습니까?</p>
          <p className="mb-2">
            거절사유를 입력해주세요. <span className="text-sm text-gray-normal">ex) 명함 화질 불량</span>
          </p>
          <p className="mb-6 text-xs font-bold"> * 사유 입력을 안하게 되면 기본 문구가 전송됩니다.</p>
          <span className="text-sm text-gray-normal"></span>
          <div>
            <p className="mb-4 font-bold">거절 사유</p>
            <textarea
              className="border w-full rounded-lg border-1 p-4"
              cols={70}
              rows={10}
              onChange={handleChangeMsg}
              placeholder="자세한 승인 거절 사유에 대해서는 Money Bridge 측으로 문의해주세요."
            ></textarea>
            <div className="flex justify-end">
              <button className="mt-2 rounded-[8px] bg-[#642626] p-3 text-white" onClick={handleRefuse}>
                거절하기
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
      {isModalOpen && <ButtonModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalContents={modalContent} />}
    </>
  );
}

export default TableBody;
