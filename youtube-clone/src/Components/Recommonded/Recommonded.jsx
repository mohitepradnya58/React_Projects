import React, { useState, useEffect } from "react";
import "./Recommonded.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommonded = ({ categoryId }) => {
  const [apiData, setApidata] = useState([]);

  const fetchData = async () => {
    const relatedvideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=245&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    await fetch(relatedvideo_url)
      .then((res) => res.json())
      .then((data) => setApidata(data.items));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="recommonded">
        {apiData.map((item, index) => {
          return (
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              className="side-video-list"
              key={index}
            >
              <img src={item.snippet.thumbnails.medium.url} alt="thumbnail1" />
              <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} views</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Recommonded;
