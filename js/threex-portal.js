var THREEx = THREEx || {}
var doorCenter = new THREE.Group
this.object3d = doorCenter

// building the 360 video / image

var isVideo = videoImageURL.match(/.(mp4|webm|ogv)/i) ? true : false
if( isVideo ){
  var video = document.createElement( 'video' )
  video.width = 640;
  video.height = 360;
  video.loop = true;
  video.muted = true;
  video.src = videoImageURL;
  video.crossOrigin = 'anonymous'
  video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
  video.play();

  var texture360 = new THREE.VideoTexture( video );
  texture360.minFilter = THREE.LinearFilter;
  texture360.format = THREE.RGBFormat;
  texture360.flipY = false;
}else{
  var texture360 = new THREE.TextureLoader().load(videoImageURL)
  texture360.minFilter = THREE.NearestFilter;
  texture360.format = THREE.RGBFormat;
  texture360.flipY = false;
}
