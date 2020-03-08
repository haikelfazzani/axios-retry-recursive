import React, { useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';

export default function Controls ({ player }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isMuted, setIsMuted] = useState(false);

  const playVideo = () => { player.playVideo() }
  const pauseVideo = () => { player.pauseVideo() }
  const stopVideo = () => { player.stopVideo() }

  const muteVideo = () => {
    player.isMuted() ? player.unMute() : player.mute();
    setIsMuted(!isMuted);
  }

  const onVolume = (e) => {
    setGlobalState({ ...globalState, controls: { ...controls, volume: e.target.value } });
    player.setVolume(e.target.value);
  }

  return <div className="controls">

    <div className="d-flex-sp">
      <button onClick={playVideo}><i className="fas fa-play"></i></button>
      <button onClick={pauseVideo}><i className="fas fa-pause"></i></button>
      <button onClick={stopVideo}><i className="fas fa-stop"></i></button>
      <button onClick={muteVideo}>
        <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
      </button>
    </div>

    <p className="m-0 truncate w-30">{globalState.controls.currVidTitle}</p>
    <div className="d-flex">
      <div><i className="fas fa-volume-up mr-10"></i></div>
      <input type="range" min="1" max="100" className="w-100" onChange={onVolume} value={globalState.controls.volume} />
    </div>

  </div>;
}