window.AudioContext=window.AudioContext||window.webkitAudioContext;let context=new AudioContext,getAudioBuffer=function(o,e){let t=new XMLHttpRequest;t.responseType="arraybuffer",t.onreadystatechange=function(){4===t.readyState&&(0!==t.status&&200!==t.status||context.decodeAudioData(t.response,function(o){e(o)}))},t.open("GET",o,!0),t.send("")},playSound=function(o){let e=context.createBufferSource();e.buffer=o,e.connect(context.destination),e.start(0)},audio_files=["congyo.mp3","excellent.mp3","gambarimasyou.mp3","go.mp3","kaishishimasu.mp3","sugoisugoi.mp3","yokudekimashita.mp3"],random_audio=audio_files[Math.floor(Math.random()*audio_files.length)];window.onload=getAudioBuffer("/audio/"+random_audio,function(o){playSound(o)});