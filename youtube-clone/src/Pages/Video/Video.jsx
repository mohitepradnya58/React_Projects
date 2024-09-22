import React from "react";
import "./Video.css";
import Playvideo from "../../Components/PlayVideo/Playvideo";
import Recommonded from "../../Components/Recommonded/Recommonded";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();
  return (
    <>
      <div className="play-container">
        <Playvideo videoId={videoId} />
        <Recommonded categoryId={categoryId} />
      </div>
    </>
  );
};

export default Video;
