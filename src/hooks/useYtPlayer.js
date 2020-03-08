import { useState, useEffect } from 'react';

var ytPlayer;
var isLoaded = false;

export default function YoutubePlayer () {

  const [player, setPlayer] = useState();

  window.onYouTubeIframeAPIReady = (e) => {
    onYouTubeIframeAPIReady();
  }


  function onYouTubeIframeAPIReady() {
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
    console.log('ok');
    isLoaded = true;
  }

  var checkYT = setInterval(function () {
    if (isLoaded) {
      //...setup video here using YT.Player()
      console.log('loaded ' + isLoaded);

      clearInterval(checkYT);
    }
  }, 100);

  return { player, setPlayer };
}