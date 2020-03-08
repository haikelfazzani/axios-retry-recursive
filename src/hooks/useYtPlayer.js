import { useState, useEffect } from 'react';

export default function YoutubePlayer () {

  const [player, setPlayer] = useState();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

      ytPlayer.addEventListener('onReady', () => {
        setIsPlayerReady(true);
        ytPlayer.setVolume(100);
      });

      ytPlayer.addEventListener('onStateChange', () => {
        // console.log('onStateChange');
        // console.log(ytPlayer.getVideoData());
      });
     })()

  }, []);

  return { player, setPlayer, isPlayerReady };
}