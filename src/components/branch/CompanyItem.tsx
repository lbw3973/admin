import { ICompanyNameListData } from "@/types/branch";
import Image from "next/image";

function CompanyItem({
  company,
  setCompanyId,
  setKeyword,
}: {
  company: ICompanyNameListData;
  setCompanyId: React.Dispatch<React.SetStateAction<ICompanyNameListData>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = (data: ICompanyNameListData) => {
    setCompanyId(data);
    setKeyword(data.name);
  };

  return (
    <div
      key={company.id}
      onClick={() => handleClick(company)}
      className="grid h-[52px] cursor-pointer grid-cols-2 items-center gap-2 border-b-1 border-r-1 border-[#E0E0E0] hover:bg-background-primary"
      id={`${company.id}`}
    >
      <Image src={company.logo} alt="logo" width={25} height={25} className="justify-self-center" />
      <span className="justify-self-start">{company.name}</span>
    </div>
  );
}

export default CompanyItem;
