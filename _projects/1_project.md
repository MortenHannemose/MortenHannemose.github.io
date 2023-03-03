---
layout: page
title: project 1
description: a project with a background image
img: assets/img/12.jpg
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

<script type="text/javascript" src="/assets/js/rotations/webgl-utils.js"></script>
<script type="text/javascript" src="./js/rotations/initShaders.js"></script>
<script type="text/javascript" src="./js/rotations/MV.js"></script>
<script type="text/javascript" src="./js/rotations/teapotData.js"></script>
<script type="text/javascript" src="./js/rotations/rotateAndShader.js"></script>
<script type="text/javascript" src="./js/rotations/three-onlymath.min.js"></script>
<div style="display:flex">
    <canvas id="gl-canvas" width="800" height="600">
        Sorry, your browser doesn't support the HTML5 canvas element
    </canvas>
    <div>
        <div>    
            <h3>Euler angles (degrees)</h3>
            <table id="euler">
                <tr><td><i>&theta;<sub>x</sub></i></td> <td><input type="range" min="-180" max="180" value="0" step="0.1" class="slider"></td> <td>value</td></tr>
                <tr><td><i>&theta;<sub>y</sub></i></td> <td><input type="range" min="-180" max="180" value="0" step="0.1" class="slider"></td> <td>value</td></tr>
                <tr><td><i>&theta;<sub>z</sub></i></td> <td><input type="range" min="-180" max="180" value="0" step="0.1" class="slider"></td> <td>value</td></tr>
            </table>
        </div>
        <div>    
            <h3>Axis angle</h3>
            <table id="axis-angle">
                <tr><td><i>r<sub>x</sub></i></td> <td><input type="range" min="-3.14" max="3.14" value="0" step="0.005" class="slider"></td> <td>value</td></tr>
                <tr><td><i>r<sub>y</sub></i></td> <td><input type="range" min="-3.14" max="3.14" value="0" step="0.005" class="slider"></td> <td>value</td></tr>
                <tr><td><i>r<sub>z</sub></i></td> <td><input type="range" min="-3.14" max="3.14" value="0" step="0.005" class="slider"></td> <td>value</td></tr>
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
<script>
	var slider_update = function () {
		var denom = 0;
		for (var i = 0; i < 4; i++) {
			var slider = quaternion_arr[i][0];
			var v = slider.value;
			if (slider == this) {
			   var nom = 1-v*v;
			} else {
				denom += v*v;
			}
		}
		var norm = Math.sqrt(nom/denom);
		var num_nonzero = 0;
		var quaternion = [];
		for (var i = 0; i < 4; i++) {
			var slider = quaternion_arr[i][0];
			if (slider != this) {
				slider.value *= norm;
			}
			quaternion.push(slider.value);
			if (slider.value != 0) {
				num_nonzero++;
			}
		}
		var Q = new THREE.Quaternion().fromArray(quaternion).normalize();
		set_euler_angles(Q);
		set_axis_angle(Q);
		while (num_nonzero==1 & this.value != 1) {//fix when a slider goes all the way to 1
			num_nonzero = 0;
			for (var i = 0; i < 4; i++) {
				var slider = quaternion_arr[i][0];
				if (slider.value == 0) {
					slider.value = (Math.floor(Math.random() * 3) - 1)*slider.step;
				}
				if (slider.value != 0) {
					num_nonzero++;
				}
			}
		}
		for (var i = 0; i < 4; i++) { //update text
			quaternion_arr[i][1].innerHTML = quaternion_arr[i][0].value;
		}
	}
	var eulerhtml = document.getElementById("euler");
	var set_euler_angles = function(Q) {
		var E = new THREE.Euler().setFromQuaternion(Q).toArray();
		for (var i = 0; i < 3; i++) {
			var slider = eulerhtml.rows[i].cells[1].firstChild;
			var output = eulerhtml.rows[i].cells[2];
			slider.value = E[i]/(2*Math.PI)*360;
			output.innerHTML = slider.value;
		}
	}
	var euler_angles_changed = function() {
		var E = [];
		for (var i = 0; i < 3; i++) {
			var slider = eulerhtml.rows[i].cells[1].firstChild;
			var output = eulerhtml.rows[i].cells[2];
			E.push(slider.value/360*2*Math.PI);
			output.innerHTML = slider.value;
		}
		var Q = new THREE.Quaternion().setFromEuler(new THREE.Euler().fromArray(E));
		set_quaternion(Q);
		set_axis_angle(Q);
		
	}
	var axisanglehtml = document.getElementById("axis-angle");
	var set_axis_angle = function(Q) {
		//set axis angle from three.js quaternion
		//var A = new THREE.Vector3().setFromMatrixColumn(new THREE.Matrix4().makeRotationFromQuaternion(Q), 0).toArray();
		//var angle = 2*Math.acos(Q.w);
		Aang = getAxisAngleFromQuaternion(Q);
		console.log(Aang);
		for (var i = 0; i < 3; i++) {
			var slider = axisanglehtml.rows[i].cells[1].firstChild;
			var output = axisanglehtml.rows[i].cells[2];
			slider.value = Aang[i];
			output.innerHTML = slider.value;
		}
	}
	var axis_angle_changed = function() {
		var A = [];
		for (var i = 0; i < 3; i++) {
			var slider = axisanglehtml.rows[i].cells[1].firstChild;
			var output = axisanglehtml.rows[i].cells[2];
			A.push(slider.value);
			output.innerHTML = slider.value;
		}
		var angle = Math.sqrt(A[0]*A[0]+A[1]*A[1]+A[2]*A[2]);
		for (var i = 0; i < 3; i++) {
			A[i] /= angle;
		}
		var axis = new THREE.Vector3().fromArray(A);
		var Q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
		set_quaternion(Q);
		set_euler_angles(Q);
	}
	var set_quaternion = function(Q) {
		var quaternion = Q.toArray();
		for (var i = 0; i < 4; i++) {
			var slider = quaternion_arr[i][0];
			var output = quaternion_arr[i][1];
			slider.value = quaternion[i];
			output.innerHTML = slider.value;
		}
	}
	var quaternion_arr = [];
	var quaternion_table = document.getElementById("quaternion");
	for (var i = 0; i < 4; i++) {
	  var slider = quaternion_table.rows[i].cells[1].firstChild;
	  var output = quaternion_table.rows[i].cells[2];
	  slider.oninput = slider_update
	  quaternion_arr.push([slider, output]);
	}
	slider.dispatchEvent(new Event('input'));
	for (var i = 0; i < 3; i++) {
		eulerhtml.rows[i].cells[1].firstChild.oninput = euler_angles_changed;
		axisanglehtml.rows[i].cells[1].firstChild.oninput = axis_angle_changed;
	}
	rotationhtml = document.getElementById("rotation");
	//https://stackoverflow.com/a/62460561
	function getAxisAngleFromQuaternion(q) {
		var angle = 2 * Math.acos(q.w);
		var s;
		if (1 - q.w * q.w < 0.000001) {
			// test to avoid divide by zero, s is always positive due to sqrt
			// if s close to zero then direction of axis not important
			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
			s = 1;
		} else { 
			s = Math.sqrt(1 - q.w * q.w);
		}
		if (angle> Math.PI) {
			angle = 2*Math.PI- angle;
			s = -s;
		}
		return [q.x/s*angle, q.y/s*angle, q.z/s*angle];
	}
</script>