import React from 'react';

export default function ListTracks ({ vidList, playerControls, onVidClick, onRemoveTrack }) {
  return <ul>
    {vidList.map((video, i) => <li key={video.vidId + i} id={video.vidId}
      className={playerControls.currentVidPlay === i ? "d-flex-sp bg-orange" : "d-flex-sp"}>
      <div onClick={() => { onVidClick(video.vidId, i) }} className="d-flex-sp w-90">
        <span><i className={playerControls.currentVidPlay === i ? "fas fa-play mr-10" : "fab fa-youtube mr-10"}></i> {video.vidTitle}</span>
      </div>
      <button className="w-10" onClick={() => { onRemoveTrack(video.vidId) }}>
        <i className="fas fa-trash"></i>
      </button>
    </li>)}
  </ul>;
}