import { useState, useEffect } from 'react';

export default function YoutubePlayer () {

  const [player, setPlayer] = useState();

  useEffect(() => {

    let divEl = document.createElement('div');
    divEl.id = 'player';
    divEl.style.display = 'none';
    document.body.append(divEl);
    var ytPlayer;

     (function () {
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
     })()

  }, []);

  return { player, setPlayer };
}