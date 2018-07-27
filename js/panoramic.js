// collection of a-frame components by tinfish-creative communications 

// global variables that do not need to be edited by the user
var time;
var currentSky = 0;
var skyCount;

AFRAME.registerComponent('sky-change', {
  schema: {
    timedLoop: {type: 'bool', default: true},
    timer: {type: 'int', default: 500},
    skys: {type: 'array'},
    fadeTransition: {type: 'bool', default: false},
    trigger: {type: 'bool', default: false}
  },
  
  init: function () {
    console.log('Sky change initiated');
    if(typeof(document.getElementsByTagName('a-sky')[0]) == 'undefined'){
      n = document.createElement("a-sky");
      this.el.appendChild(n);
      if(this.data.fadeTransition){
        n= document.createElement("a-sky");
        this.el.appendChild(n);
      }
    }
    skyCount = this.data.skys.length;
    for(i=0; i<skyCount;i++){
      console.log(this.data.skys[i]);
    }
    document.getElementsByTagName('a-sky')[0].setAttribute('material', 'src:'+this.data.skys[0]);
    if(this.data.fadeTransition){
      document.getElementsByTagName('a-sky')[1].setAttribute('material', 'opacity:0; src:'+this.data.skys[1]);
      document.getElementsByTagName('a-sky')[1].setAttribute('geometry', 'radius: 2500');
    }
    time = 0;
  },
  
  update: function () {
    if(this.data.fadeTransition && document.getElementsByTagName('a-sky').length == 1){
      n= document.createElement("a-sky");
      this.el.appendChild(n);
      document.getElementsByTagName('a-sky')[1].setAttribute('material', 'opacity:0; src:'+this.data.skys[currentSky+1]);
      document.getElementsByTagName('a-sky')[1].setAttribute('geometry', 'radius: 2500');
    }
    if(this.data.fadeTransition == false){
      document.getElementsByTagName('a-sky')[1].setAttribute('material', 'opacity:0');
      document.getElementsByTagName('a-sky')[0].setAttribute('material', 'opacity:1');
    }
  },
  
  tick: function () {
    if(this.data.timedLoop){
      if(time < this.data.timer){
        time++;
      }else{
        console.log('Sky change');
        currentSky++;
        if(currentSky == skyCount){
          currentSky = 0;
        }
        console.log('currentSky = '+currentSky);
        if(this.data.fadeTransition){
          var s = document.getElementsByTagName('a-sky');
          if(s[0].getAttribute('material').opacity <= 0){
            fadeout(s[1], this.data.skys);
            fadein(s[0]);
          }else{
            fadeout(s[0], this.data.skys);
            fadein(s[1]);
          }
        }else{
          document.getElementsByTagName('a-sky')[0].setAttribute('material', 'src:'+this.data.skys[currentSky]);
        }
        time = 0;
      }
    }else{
      if(this.data.trigger == true){
        currentSky++;
        if(currentSky == skyCount){
          currentSky = 0;
        }
        console.log('currentSky = '+currentSky);
        if(this.data.fadeTransition){
          var s = document.getElementsByTagName('a-sky');
          if(s[0].getAttribute('material').opacity <= 0){
            fadeout(s[1], this.data.skys);
            fadein(s[0]);
          }else{
            fadeout(s[0], this.data.skys);
            fadein(s[1]);
          }
        }else{
          document.getElementsByTagName('a-sky')[0].setAttribute('material', 'src:'+this.data.skys[currentSky]);
        }
        this.data.trigger = false;
      }
    }
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});

function fadeout(elm, s){
  if(typeof(transout) != 'undefined'){
    clearInterval(transout);
  }
  var opacity = 1;
  transout = setInterval(function(){
    opacity = opacity - 0.05;
    // document.getElementsByTagName('a-sky')[0].setAttribute('material', 'opacity:'+opacity);
    elm.setAttribute('material', 'opacity:'+opacity);
    if(opacity < 0){
      console.log(currentSky);
      if(currentSky+1 < skyCount){
        elm.setAttribute('material', 'src:'+s[currentSky+1]);
      }else{
        elm.setAttribute('material', 'src:'+s[0]);
      }
      clearInterval(transout);
    }
  }, 50);
}

function fadein(elm){
  if(typeof(transin) != 'undefined'){
    clearInterval(transin);
  }
  var opacity = 0;
  transin = setInterval(function(){
    opacity = opacity + 0.05;
    // document.getElementsByTagName('a-sky')[0].setAttribute('material', 'opacity:'+opacity);
    elm.setAttribute('material', 'opacity:'+opacity);
    if(opacity > 1){
      clearInterval(transin);
    }
  }, 50);
}