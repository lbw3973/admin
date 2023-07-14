"use client";
import { IDashBoardData } from "@/types/dashBoard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ dashBoardData }: { dashBoardData: IDashBoardData }) {
  const { apply, confirm, complete, review } = dashBoardData;
  const data = {
    labels: ["신규예약", "예약확정", "상담완료", "후기작성"],
    datasets: [
      {
        data: [apply, confirm, complete, review],
        backgroundColor: ["#ff6384", "#ffcd56", "#4bc0c0", "#36a2eb"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="h-[550px] w-[550px]">
      <Doughnut data={data} />
    </div>
  );
}

export default DoughnutChart;
