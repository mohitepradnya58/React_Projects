import React from "react";
import { useTimer } from "use-timer";
const DecrementalTime = () => {
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 100,
    endTime: 0,
    timerType: "DECREMENTAL",
  });
  return (
    <div className="grid place-content-center w-screen h-screen">
      <p className="text-5xl mb-5 text-center">Decremental Timer</p>
      <div className="flex mb-5 flex-wrap justify-center">
        <button
          onClick={start}
          className="p-2 m-3 bg-blue-400 text-white rounded-2xl min-w-24"
        >
          Start
        </button>
        <button
          onClick={pause}
          className="p-2 m-3 bg-blue-400 text-white rounded-2xl  min-w-24"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="p-2 m-3 bg-blue-400 text-white rounded-2xl  min-w-24"
        >
          Reset
        </button>
      </div>
      <p className="text-3xl mb-5 text-center">Start Timer</p>
      <div className=" grid place-content-center">
        <div className="bg-black text-white rounded-full grid place-content-center text-5xl w-[13rem] h-[13rem]">
          {time} sec
        </div>
      </div>
      {status === "RUNNING" && (
        <p className="block mt-5 text-center text-2xl">Running...</p>
      )}
    </div>
  );
};

export default DecrementalTime;
