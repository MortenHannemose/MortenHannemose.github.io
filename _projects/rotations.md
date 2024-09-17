---
layout: page
title: Rotation explorer
description: interactively change the rotation of a 3D object
img: assets/img/rotations.jpg
importance: 1
category: work
---

<script id="vertex-shader" type="x-shader/x-vertex">
	attribute  vec4 vPosition;
	attribute  vec4 vNormal;
	varying vec3 fNormal;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;
	uniform mat3 normalMatrix;

	void main()
	{
		vec3 pos = (modelViewMatrix * vPosition).xyz;

		// Transform vertex normal into eye coordinates
		gl_Position = projectionMatrix * modelViewMatrix * vPosition;
		fNormal = normalMatrix*vNormal.xyz;
	}
</script>

<script id="fragment-shader" type="x-shader/x-fragment">
	precision mediump float;

	uniform vec3 lightDirection;
	uniform vec4 k_a, k_d;
	varying vec3 fNormal;

	void
	main()
	{
		vec3 L = -normalize(lightDirection);
		vec3 N = normalize(fNormal);
		gl_FragColor = k_a + k_d*max(dot(L, N), 0.0);
		gl_FragColor.a = 1.0;
	}
</script>

<style>
input,output{display: inline-block; vertical-align: middle;}
.matrix {
  position: relative;
}
.matrix td {
  padding: 2px 6px;
  text-align: right;
}
.matrix:before,
.matrix:after {
  content: "";
  position: absolute;
  top: 0px;
  border: 1px solid #000;
  width: 6px;
  height: 100%;
}

.matrix:before {
  left: -6px;
  border-right: 0px;
}

.matrix:after {
  right: -6px;
  border-left: 0px;
}
</style>

<script type="text/javascript" src="/assets/js/rotations/webgl-utils.js"></script>
<script type="text/javascript" src="/assets/js/rotations/initShaders.js"></script>
<script type="text/javascript" src="/assets/js/rotations/MV.js"></script>
<script type="text/javascript" src="/assets/js/rotations/teapotData.js"></script>
<script type="text/javascript" src="/assets/js/rotations/rotateAndShader.js"></script>
<script type="text/javascript" src="/assets/js/rotations/three-onlymath.min.js"></script>
<div style="display:flex">
    <canvas id="gl-canvas" width="600" height="600">
        Sorry, your browser doesn't support the HTML5 canvas element
    </canvas>
    <div>
        <div>    
            <h3>Euler angles</h3>
            <table id="euler">
                <tr><td><i>&theta;<sub>x</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                <tr><td><i>&theta;<sub>y</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                <tr><td><i>&theta;<sub>z</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
            </table>
        </div>
        <div>    
            <h3>Axis angle</h3>
            <table id="axis-angle">
                <tr><td><i>r<sub>x</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                <tr><td><i>r<sub>y</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                <tr><td><i>r<sub>z</sub></i></td> <td><input type="range" min="-3.1415" max="3.1415" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
            </table>
        </div>
        <div>    
            <h3>Quaternion</h3>
                <table id="quaternion">
                    <tr><td><i>q<sub>x</sub></i></td> <td><input type="range" min="-1" max="1" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                    <tr><td><i>q<sub>y</sub></i></td> <td><input type="range" min="-1" max="1" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                    <tr><td><i>q<sub>z</sub></i></td> <td><input type="range" min="-1" max="1" value="0" step="0.001" class="slider"></td> <td>value</td></tr>
                    <tr><td><i>q<sub>w</sub></i></td> <td><input type="range" min="-1" max="1" value="1" step="0.001" class="slider"></td> <td>value</td></tr>
                </table>
        </div>
        <div style="display: flex; align-items: center;">
            <p style="margin-right: 10pt;"><b>R</b> = </p>
            <table class="matrix" id="rotation">
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript" src="/assets/js/rotations/rotationMain.js"></script>