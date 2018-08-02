A-FRAME AR.js my variation version 1.0.0

based on AR.js by jerome etienne https://github.com/jeromeetienne/AR.js

DOCUMENTATION

the default patern ratio is now 0.9 this means that the majority of markers will not be reconnised until the border is reduced this can be achieved
with the marker generator here: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

custom markers have been implemented and these can be used as follows 

&lt;div class="highlight highlight-text-html-basic"&gt;<br>
&#9;&lt;a-marker preset="custom" patternUrl="/path/to/patt/file"&gt;<br>
&#9;&lt;/a-marker&gt;<br>
&lt;/div&gt;

CHANGELOG

changes from vannilla ar.js
2/8/2018

changed the default pattern ratio to 0.9.
modified the marker presets to accept custom markers easily without library modifications.
