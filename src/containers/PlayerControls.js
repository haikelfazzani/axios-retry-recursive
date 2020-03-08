import React, { useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';
import Modal from '../components/Modal';

export default function Controls ({ player }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playVideo = () => { player.playVideo() }
  const pauseVideo = () => { player.pauseVideo() }
  const stopVideo = () => { player.stopVideo() }

  const muteVideo = () => {
    player.isMuted() ? player.unMute() : player.mute();
    setGlobalState({ ...globalState, controls: { isMuted: !globalState.controls.isMuted } });
  }

  const onVolume = (e) => {
    setGlobalState({ ...globalState, controls: { volume: e.target.value } });
    player.setVolume(e.target.value);
  }

  const openModal = () => { setIsModalOpen(!isModalOpen) }

  return <div className="controls">

    <div className="d-flex-sp">
      <button onClick={playVideo}><i className="fas fa-play"></i></button>
      <button onClick={pauseVideo}><i className="fas fa-pause"></i></button>
      <button onClick={stopVideo}><i className="fas fa-stop"></i></button>
      <button onClick={muteVideo}>
        <i className={globalState.controls.isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
      </button>      
    </div>

    <p className="m-0 truncate">{globalState.controls.currVidTitle}</p>

    <button onClick={openModal}><i className="fab fa-dyalog"></i></button>

    {isModalOpen && <Modal>
      <div className="d-flex-col">
        <div><i className="fas fa-volume-up"></i></div>
        <input type="range" min="1" max="100" className="w-100" onChange={onVolume} value={globalState.controls.volume} />
      </div>
    </Modal>}
  </div>;
}