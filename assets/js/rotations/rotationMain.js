var quaternion_changed = function () {
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
		slider.value = E[i];
		output.innerHTML = parseFloat(slider.value).toFixed(2);
	}
}
var euler_angles_changed = function() {
	var E = [];
	for (var i = 0; i < 3; i++) {
		var slider = eulerhtml.rows[i].cells[1].firstChild;
		var output = eulerhtml.rows[i].cells[2];
		E.push(parseFloat(slider.value));
		output.innerHTML = parseFloat(slider.value).toFixed(2);
	}
	var Q = new THREE.Quaternion().setFromEuler(new THREE.Euler().fromArray(E));
	set_quaternion(Q);
	set_axis_angle(Q);
	
}
var axisanglehtml = document.getElementById("axis-angle");
var set_axis_angle = function(Q) {
	var Aang = getAxisAngleFromQuaternion(Q);
	for (var i = 0; i < 3; i++) {
		var slider = axisanglehtml.rows[i].cells[1].firstChild;
		var output = axisanglehtml.rows[i].cells[2];
		slider.value = Aang[i];
		output.innerHTML = parseFloat(slider.value).toFixed(2);
	}
}
var axis_angle_changed = function() {
	var A = [];
	for (var i = 0; i < 3; i++) {
		var slider = axisanglehtml.rows[i].cells[1].firstChild;
		var output = axisanglehtml.rows[i].cells[2];
		A.push(slider.value);
		output.innerHTML = parseFloat(slider.value).toFixed(2);
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
	var err = 0;
	var errFlip = 0;
	for (var i = 0; i < 4; i++) {
		var slider = quaternion_arr[i][0];
		err += Math.abs(quaternion[i]-parseFloat(slider.value));
		errFlip += Math.abs(quaternion[i]+parseFloat(slider.value));
		slider.value = quaternion[i];
	}
	for (var i = 0; i < 4; i++) {
		var slider = quaternion_arr[i][0];
		var output = quaternion_arr[i][1];
		if (errFlip < err) {
			quaternion[i] = -quaternion[i];
		}
		slider.value = quaternion[i];
		output.innerHTML = parseFloat(slider.value).toFixed(3);
	}
}
var quaternion_arr = [];
var quaternion_table = document.getElementById("quaternion");
for (var i = 0; i < 4; i++) {
  var slider = quaternion_table.rows[i].cells[1].firstChild;
  var output = quaternion_table.rows[i].cells[2];
  slider.oninput = quaternion_changed
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
init();
