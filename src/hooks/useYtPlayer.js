import { useState, useEffect } from 'react';

var ytPlayer;

export default function YoutubePlayer () {

  const [player, setPlayer] = useState();

  useEffect(() => {
    window['onYouTubeIframeAPIReady'] = (e) => {
      let divEl = document.createElement('div');
      divEl.id = 'player';
      divEl.style.display = 'none';
      document.body.append(divEl);      

      ytPlayer = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'SMgWHnDMHvU',
        playerVars: {
          enablejsapi: 1,
          loop: 1
        }
      });

      setPlayer(ytPlayer);      
    }
  }, []);

  return { player, setPlayer };
}