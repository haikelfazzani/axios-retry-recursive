import React, { useState, useEffect } from 'react';
import '../styles/PlayerControls.scss';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function PlayerControls () {

  const [progress, setProgress] = useState(0);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Enjoy music with Yplayer..');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [control, setControl] = useState({ isPlaying: false, isMuted: false, volume: 50 });

  const playVideo = () => {
    player.playVideo();
    setControl({ ...control, isPlaying: true });
  }
  const pauseVideo = () => { player.pauseVideo(); setControl({ ...control, isPlaying: false }); }
  const stopVideo = () => {
    player.stopVideo();
    setProgress(0);
    setControl({ ...control, isPlaying: false });
  }

  const muteVideo = () => {
    player.isMuted() ? player.unMute() : player.mute();
    setControl({ ...control, isMuted: !control.isMuted });
  }

  const onVolume = (e) => {
    player.setVolume(e.target.value);
    setControl({ ...control, volume: e.target.value });
  }

  const openVolume = () => {
    setIsVolumeOpen(!isVolumeOpen);
  }

  const onExternal = () => { window.shell.openExternal('https://github.com/haikelfazzani') }

  useEffect(() => {

    let player = window.player;

    if (player) {
      var tackCurrDuration = 0;
      var myTrackTimer;

      player.addEventListener('onStateChange', (event) => {

        setTrackTitle(player.getVideoData().title);

        if (event.data == 1) {
          setControl({ ...control, isPlaying: true });
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
    }
  }, [window.player]);

  return <>
    <div className="controls">

      <div className="btn-controls">
        <div>
          {!control.isPlaying
            ? <Button onClick={playVideo} faIcon="fas fa-play" />
            : <Button onClick={pauseVideo} faIcon="fas fa-pause" />}

          <Button onClick={stopVideo} faIcon="fas fa-stop" />
          <Button onClick={muteVideo} faIcon={control.isMuted ? "fas fa-volume-mute" : "fas fa-volume-off"} />
        </div>

        <p className="track-title m-0 truncate">{trackTitle}</p>

        <div>
          <Button onClick={openVolume} faIcon="fas fa-volume-up" />
          <Button onClick={() => { setIsModalOpen(!isModalOpen); }} faIcon="fas fa-info" />
        </div>
      </div>

      <div className="progress-container">
        <div className="progress" style={{ width: progress + '%' }}></div>
      </div>
    </div>

    <div className="volume-range" style={{ display: isVolumeOpen ? 'block' : 'none' }}>
      <input type="range" min="1" max="100" className="mr-10"
        onChange={onVolume}
        value={control.volume}
      />
    </div>


    {isModalOpen && <Modal>
      <div className="about">
        <div onClick={onExternal}>Created by Haikel Fazzani</div>
        <p className="m-0">Copyright © Yplayer - 2020</p>
      </div>
    </Modal>}
  </>;
}