(function(){
  function AlbumCtrl() {
    this.albumData = albumPicasso;
    this.songs = this.albumData.songs;
  }


  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
