(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        *@desc getting albumData
        *@type {Object} currentAlbum
        */

        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
          if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
      }
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });
        SongPlayer.currentSong = song;
      };

      /**
      * @function playSong
      * @desc plays song
      * @param {Object} song
      */
        var playSong = function(song){
          currentBuzzObject.play();
          song.playing = true;
        };

        var stopSong = function(song){
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }

      /**
      @function getSongIndex
      @desc getting index of song
      */
      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      };

      SongPlayer.currentSong = null;

      /**
      * @function .play
      * @desc play current or new song
      * @param {Object} song
      */
        SongPlayer.play = function(song){
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song){
              setSong(song);
              playSong(song);
          } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()){
                currentBuzzObject.play();
              }
            }
        };

        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
        *@function songPlayer.previous
        *@desc previous song
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex >= currentAlbum.songs.length) {
            stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        return SongPlayer;
     }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
 })();
