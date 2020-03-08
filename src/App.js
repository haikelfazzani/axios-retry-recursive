import React, { useState, useEffect } from "react";
import useYtPlayer from "./hooks/useYtPlayer";
import StorageManager from "./util/StorageManager";
import './index.scss';

export default function App () {

  var { player, isPlayerReady } = useYtPlayer();
  const [vidInfos, setVidInfos] = useState({
    vidId: '',
    vidTitle: null
  });

  const [playerVolume, setPlayerVolume] = useState(50);

  const [vidList, setVidList] = useState([]);

  useEffect(() => {
    (async () => {
      let listVids = await StorageManager.getList();
      setVidList(listVids);
    })();
  }, []);

  const playVideo = () => { player.playVideo() }
  const pauseVideo = () => { player.pauseVideo() }
  const stopVideo = () => { player.stopVideo() }
  const onVolume = (e) => {
    setPlayerVolume(e.target.value);
    player.setVolume(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let p = [...vidList];

    if (!p.some(v => v.vidId === vidInfos.vidId)) {
      window.ytdlCore.getBasicInfo(vidInfos.vidId, (err, info) => {

        p.push({ vidId: vidInfos.vidId, vidTitle: info.title });

        setVidInfos({ ...vidInfos, vidTitle: info.title })
        setVidList(p);

        StorageManager.saveOne({
          vidId: vidInfos.vidId,
          vidTitle: info.title
        });

      });
    }
  }

  const onVidClick = (vidId) => {
    if (player) {
      player.loadVideoById(vidId);
    }
  }

  return (<div className="d-flex-col-sp h-100 w-100">

      <div className="w-100 h-90">

        <div className="controls w-100">
          <button onClick={playVideo}><i className="fas fa-play"></i></button>
          <button onClick={pauseVideo}><i className="fas fa-pause"></i></button>
          <button onClick={stopVideo}><i className="fas fa-stop"></i></button>

          <div className="d-flex">
            <i className="fas fa-volume-mute"></i>
            <input type="range" min="1" max="100" onChange={onVolume} value={playerVolume} />
            <i className="fas fa-volume-up"></i>
          </div>
        </div>

        {vidList && vidList.length > 0 && <ul className="h-100">
          {vidList.map((video, i) => <li key={video.vidId + i} id={video.vidId} className="d-flex-sp">
            <div onClick={() => { onVidClick(video.vidId) }} className="w-70">
              {video.vidTitle} {video.duration}
            </div>
            <button className="w-10"><i className="fas fa-trash"></i></button>
          </li>)}
        </ul>}
      </div>

      <form onSubmit={onSubmit} className="w-100 h-10">
        <input type="text" onChange={(e) => { setVidInfos({ vidId: e.target.value }); }}
          value={vidInfos.vidId}
          placeholder="Enter video id: QB-fo_bGnQs"
          required />
        <button type="submit">add</button>
      </form>

    </div>);
}