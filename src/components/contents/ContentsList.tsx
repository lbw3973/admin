import { IContentsListProps } from "@/types/contents";

const TD_style = "border-r-1 border-b-1 border-[#E0E0E0]";
function ContentsList({ nowPage, contentsList, setSeeContent }: IContentsListProps) {
  return (
    <>
      {contentsList.map((item, index) => (
        <tr
          key={item.id}
          onClick={() => {
            setSeeContent(item);
          }}
          className="h-[52px] cursor-pointer text-center hover:bg-background-primary"
        >
          <td className={TD_style}>{nowPage * 10 + index + 1}</td>
          <td className={TD_style}>{item.title}</td>
          <td className={TD_style}>{item.pbName}</td>
        </tr>
      ))}
    </>
  );
}

export default ContentsList;
