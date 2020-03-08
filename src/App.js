import React, { useState, useEffect, useContext } from "react";
import useYtPlayer from "./hooks/useYtPlayer";
import StorageManager from "./util/StorageManager";
import './index.scss';
import ListTracks from "./containers/ListTracks";
import PlayerControls from "./containers/PlayerControls";
import GlobalContext from "./providers/GlobalContext";

export default function App () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  var { player } = useYtPlayer();
  const [vidInfos, setVidInfos] = useState({ vidId: '', vidTitle: null });

  const [vidList, setVidList] = useState([]);

  useEffect(() => {
    if (player) {
      player.addEventListener('onReady', async () => {
        let listVids = await StorageManager.getList();
        setVidList(listVids);
      });
    }

  }, [player]);

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

  const onVidClick = (vidId, vidIdx) => {
    if (player) {
      player.loadVideoById(vidId);
      setGlobalState({
        ...globalState, controls: {
          ...globalState.controls,
          currentVidPlay: vidIdx,
          currVidTitle: vidList[vidIdx].vidTitle
        }
      });
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

      <PlayerControls player={player} />

      {vidList && vidList.length > 0
        && <ListTracks
          vidList={vidList}
          playerControls={globalState.controls}
          onVidClick={onVidClick}
          onRemoveTrack={onRemoveTrack}
        />}
    </div>

    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => { setVidInfos({ vidId: e.target.value }); }}
        value={vidInfos.vidId}
        placeholder="Enter video id: QB-fo_bGnQs"
        required
      />
      <button type="submit"><i className="fas fa-plus-circle"></i></button>
    </form>

  </>);
}