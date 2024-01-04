swfobject.embedSWF = function(url, cont) {
    var ruffle = window.RufflePlayer.newest(),
        player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
            style: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;',
        });

    player.load({ url: url });
}
