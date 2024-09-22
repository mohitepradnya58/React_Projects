import React, { useEffect, useState } from "react";
import "./playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const Playvideo = () => {
  const [apidata, setApidata] = useState(null);
  const [channeldata, setChanneldata] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const { videoId } = useParams();
  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApidata(data.items[0]));
  };
  const fetchChannelData = async () => {
    if (apidata && apidata.snippet && apidata.snippet.channelId) {
      const ChannelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
      await fetch(ChannelDetails_url)
        .then((res) => res.json())
        .then((data) => setChanneldata(data.items[0]));
    }
  };

  const fetchCommentData = async () => {
    const commentDetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    await fetch(commentDetails_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apidata]);
  useEffect(() => {
    fetchCommentData();
  }, [videoId]);
  return (
    <>
      <div className="play-video">
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <h3>{apidata ? apidata.snippet.title : "Title here"}</h3>
        <div className="play-video-info">
          <p>
            {apidata ? value_converter(apidata.statistics.viewCount) : "16K"}
            Views &bull;
            {apidata ? moment(apidata.snippet.publishedAt).fromNow() : ""}
          </p>
          <div>
            <span>
              <img src={like} alt="like" />
              {apidata ? value_converter(apidata.statistics.likeCount) : 155}
            </span>
            <span>
              <img src={dislike} alt="dislike" />
            </span>
            <span>
              <img src={share} alt="share" />
              Share
            </span>
            <span>
              <img src={save} alt="save" />
              Save
            </span>
          </div>
        </div>
        <hr />
        <div className="publisher">
          <img
            src={channeldata ? channeldata.snippet.thumbnails.default.url : ""}
            alt="author"
          />
          <div>
            <p>{apidata ? apidata.snippet.channelTitle : ""}</p>
            <span>
              {channeldata
                ? value_converter(channeldata.statistics.subscriberCount)
                : "1M"}
              Subscribers
            </span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="vid-description">
          <p>
            {apidata
              ? apidata.snippet.description.slice(0, 250)
              : "Description here"}
          </p>
          <hr />
          <h4>
            {apidata ? value_converter(apidata.statistics.commentCount) : 102}
          </h4>
          {commentData.map((item, index) => {
            return (
              <div key={index} className="comment">
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt="user_profile"
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span>1 day ago</span>
                  </h3>
                  <p> {item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>
                      {value_converter(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Playvideo;
