import React, { useState, useEffect } from 'react';
import '../styles/PlayerControls.scss';

export default function PlayerControls ({ player }) {

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [trackTitle, setTrackTitle] = useState('Enjoy music with Yplayer..');

  const playVideo = () => { player.playVideo() }
  const pauseVideo = () => { player.pauseVideo() }
  const stopVideo = () => { player.stopVideo(); setProgress(0); }

  const muteVideo = () => {
    player.isMuted() ? player.unMute() : player.mute();
    setIsMuted(!isMuted);
  }

  const onVolume = (e) => {
    player.setVolume(e.target.value);
    setVolume(e.target.value);
  }

  useEffect(() => {

    var tackCurrDuration = 0;
    var myTrackTimer;

    player.addEventListener('onStateChange', (event) => {

      setTrackTitle(player.getVideoData().title);

      if (event.data == 1) {
        let totalDuration = Math.floor(player.getDuration());

        myTrackTimer = setInterval(() => {
          tackCurrDuration = (player.getCurrentTime() / totalDuration) * 100;
          setProgress(tackCurrDuration);
        }, 1000);
      }
      else {
        if (tackCurrDuration >= 98) { setProgress(100); }
        clearInterval(myTrackTimer);
      }
    });
  }, []);

  return <div className="controls">    

    <p className="track-title m-0 truncate"><i className="fas fa-music mr-5"></i><span>{trackTitle}</span></p>

    <div className="progress-container">
      <div className="progress" style={{ width: progress + '%' }}></div>
    </div>

    <div className="btn-controls">
      <button onClick={playVideo}><i className="fas fa-play"></i></button>
      <button onClick={pauseVideo}><i className="fas fa-pause"></i></button>
      <button onClick={stopVideo}><i className="fas fa-stop"></i></button>
      <button onClick={muteVideo}>
        <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
      </button>

      <input type="range" min="1" max="100" className="mr-10" onChange={onVolume} value={volume} />
    </div>

  </div>;
}