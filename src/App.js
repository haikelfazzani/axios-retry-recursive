import React, { useState, useEffect, useContext } from "react";
import StorageManager from "./util/StorageManager";
import Modal from './components/Modal';
import './index.scss';
import ListTracks from "./containers/ListTracks";
import PlayerControls from "./containers/PlayerControls";
import GlobalContext from "./providers/GlobalContext";
import Valid from './util/Valid.js';

export default function App () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [vidInfos, setVidInfos] = useState({ vidId: '', vidTitle: null });
  const [vidList, setVidList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      if (!p.some(v => v.vidId === vidInfos.vidId)) {

        let inputVidId = vidInfos.vidId.split('watch?v=')[1] || vidInfos.vidId;

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
      setGlobalState({
        ...globalState, controls: {
          ...globalState.controls,
          currentVidPlay: vidIdx
        }
      });
    }
  }

  const onRemoveTrack = async (vidId) => {
    let p = [];
    p = vidList.filter(v => v.vidId !== vidId);
    setVidList(p);
    await StorageManager.removeOne(vidId);
  }

  const onExternal = () => { window.shell.openExternal('https://github.com/haikelfazzani') }

  return (<>
    <div className="player">

      <PlayerControls player={window.player} />

      {vidList && vidList.length > 0
        && <ListTracks
          vidList={vidList}
          playerControls={globalState.controls}
          onVidClick={onVidClick}
          onRemoveTrack={onRemoveTrack}
        />}
    </div>

    <div className="bottom-banner">
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

      <button onClick={() => { setIsModalOpen(!isModalOpen); }}>
        <i className="fab fa-dyalog"></i>
      </button>
    </div>

    {isModalOpen && <Modal>
      <div className="about">        
        <div onClick={onExternal}>Created by Haikel Fazzani</div>
        <p className="m-0">Copyright © Yplayer - 2020</p>
      </div>
    </Modal>}
  </>);
}