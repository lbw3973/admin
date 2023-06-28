import React from "react";

function JoinPbCount({ pbCount }: { pbCount: number }) {
  return (
    <div className=" h-[150px] w-[300px] self-end rounded-md bg-white px-5 py-4 shadow-lg">
      <p className="text-xl font-bold">승인 대기 PB 수</p>
      <div className="text-center text-5xl font-bold">{pbCount}</div>
    </div>
  );
}

export default JoinPbCount;
