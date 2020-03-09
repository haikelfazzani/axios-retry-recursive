import React from 'react';

export default function ListTracks ({ vidList, playerControls, onVidClick, onRemoveTrack }) {
  return <ul>
    {vidList.map((video, i) => <li key={video.vidId + i} id={video.vidId}
      className={playerControls.currentVidPlay === i ? "d-flex-sp bg-orange" : "d-flex-sp"}>
      <div onClick={() => { onVidClick(video.vidId, i) }} className="d-flex-sp w-90">

        <img src={`https://img.youtube.com/vi/${video.vidId}/default.jpg`} 
        width="40" height="40"
        alt="video" className="mr-10" />

        <span><i className={playerControls.currentVidPlay === i
          ? "fas fa-play mr-5"
          : "fab fa-youtube mr-5"}></i> {video.vidTitle}
        </span>
      </div>

      <button className="w-10" onClick={() => { onRemoveTrack(video.vidId) }}>
        <i className="fas fa-trash"></i>
      </button>
      
    </li>)}
  </ul>;
}