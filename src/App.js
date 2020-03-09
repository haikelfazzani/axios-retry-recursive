import React, { useState, useEffect, useContext } from "react";
import StorageManager from "./util/StorageManager";
import './index.scss';
import ListTracks from "./containers/ListTracks";
import PlayerControls from "./containers/PlayerControls";
import GlobalContext from "./providers/GlobalContext";
import Valid from './util/Valid.js';

export default function App () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [vidInfos, setVidInfos] = useState({ vidId: '', vidTitle: null });
  const [vidList, setVidList] = useState([]);

  useEffect(() => {
    (async () => {
      let listVids = await StorageManager.getList();
      setVidList(listVids);
    })();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Valid.ytUrl(vidInfos.vidId)) {
      let p = [...vidList];

      let inputVidId = vidInfos.vidId.length > 25 ? vidInfos.vidId.split('watch?v=')[1] : vidInfos.vidId;

      if (!p.some(v => v.vidId === inputVidId)) {

        window.ytdlCore.getBasicInfo(inputVidId, (err, info) => {

          p.push({ vidId: inputVidId, vidTitle: info.title });

          setVidInfos({ ...vidInfos, vidTitle: info.title });
          setVidList(p);

          StorageManager.saveOne({ vidId: inputVidId, vidTitle: info.title });
          setVidInfos({ vidId: '' });
        });
      }
    }
  }

  const onVidClick = (vidId, vidIdx) => {
    if (window.player) {
      window.player.loadVideoById(vidId);
      setGlobalState({ ...globalState, currTrackId: vidId, currTrackIndex: vidIdx });
    }
  }

  const onRemoveTrack = async (vidId) => {
    let p = [...vidList];
    p = p.filter(v => v.vidId !== vidId);
    setVidList(p);
    await StorageManager.removeOne(vidId);
  }

  return (<>
    <div className="player">

      <PlayerControls />

      {vidList && vidList.length > 0
        && <ListTracks
          vidList={vidList}
          currTrackIndex={globalState.currTrackIndex}
          onVidClick={onVidClick}
          onRemoveTrack={onRemoveTrack}
        />}
    </div>

    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => { setVidInfos({ vidId: e.target.value }); }}
        value={vidInfos.vidId}
        placeholder="Example: https://www.youtube.com/watch?v=WpN8HiZ4Ojw"
        required
      />

      <button type="submit"><i className="fas fa-plus-circle"></i></button>
    </form>
  </>);
}