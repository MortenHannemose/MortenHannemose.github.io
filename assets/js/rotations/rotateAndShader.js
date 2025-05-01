"use strict";
function init()
{
  var numSubdivs = 15;
  var canvas = document.getElementById("gl-canvas");

  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert( "WebGL isn't available" ); }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  gl.program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( gl.program );

  gl.vBuffer = null;
  gl.nBuffer = null;
  var numVerts = initTeapot(gl, numSubdivs);

  var projectionMatrix = ortho(-2, 2, -2, 2, -200, 200);
  gl.uniformMatrix4fv( gl.getUniformLocation(gl.program, "projectionMatrix"), false, flatten(projectionMatrix));

  gl.uniform4fv(gl.getUniformLocation(gl.program, "k_a"), flatten(vec4(0.2, 0.2, 0.2, 1.0)));
  gl.uniform4fv(gl.getUniformLocation(gl.program, "k_d"), flatten(vec4(0.8, 0.8, 0.8, 1.0)));
  gl.uniform3fv(gl.getUniformLocation(gl.program, "lightDirection"), flatten(vec3(0.0, -1.0, -1.0)));

  var currentAngle = [0.0, 0.0]; // [x-axis, y-axis] degrees
  var currentQuaternion = [0.0, 0.0, 0.0, 0.0]; // [x, y, z, w]
  initEventHandlers(canvas, currentAngle, currentQuaternion);

  function tick() {
    render(gl, numVerts, currentAngle);
    requestAnimationFrame(tick);
  }
  tick();
}

function quaternionToMatrix(q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  return mat4(
    1 - 2*y*y - 2*z*z, 2*x*y - 2*z*w, 2*x*z + 2*y*w, 0,
    2*x*y + 2*z*w, 1 - 2*x*x - 2*z*z, 2*y*z - 2*x*w, 0,
    2*x*z - 2*y*w, 2*y*z + 2*x*w, 1 - 2*x*x - 2*y*y, 0,
    0, 0, 0, 1
  );

}

function render(gl, numVerts, currentAngle)
{
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var currentQuaternion = [];
  for (var i = 0; i < 4; ++i) {
    currentQuaternion[i] = quaternion_arr[i][0].value;
  }
  var modelMatrix = quaternionToMatrix(currentQuaternion);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        rotationhtml.rows[i].cells[j].innerHTML = modelMatrix[i][j].toFixed(2);
    }
  }
  var modelViewMatrix = mult(mult(rotate(currentAngle[0], vec3(1.0, 0.0, 0.0)), rotate(currentAngle[1], vec3(0.0, 1.0, 0.0))), modelMatrix);
  gl.uniformMatrix4fv( gl.getUniformLocation(gl.program, "modelViewMatrix"), false, flatten(modelViewMatrix));
  var normalMat = normalMatrix(modelViewMatrix, true);
  gl.uniformMatrix3fv(gl.getUniformLocation(gl.program, "normalMatrix"), false, flatten(normalMat));

  gl.drawArrays( gl.TRIANGLES, 0, numVerts);
}

function initTeapot(gl, numSubdivs)
{
  var myTeapot = teapot(numSubdivs);
  //myTeapot.rotate(60.0, [1, 0, 0]);
  myTeapot.translate(0, -.5, 0);
  myTeapot.scale(0.6, 0.6, 0.6);
  

  gl.deleteBuffer(gl.vBuffer);
  gl.vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(myTeapot.TriangleVertices), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(gl.program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  gl.deleteBuffer(gl.nBuffer);
  gl.nBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.nBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(myTeapot.Normals), gl.STATIC_DRAW);

  var vNormal = gl.getAttribLocation(gl.program, "vNormal");
  gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vNormal);

  return myTeapot.TriangleVertices.length;
}

function initEventHandlers(canvas, currentAngle, currentQuaternion)
{
  var dragging = false; // Dragging or not
  var lastX = -1, lastY = -1; // Last position of the mouse

  canvas.onmousedown = function(ev) { // Mouse is pressed
    var x = ev.clientX, y = ev.clientY;
    // Start dragging if a mouse is in <canvas>
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
    }
  };

  // Mouse is released
  canvas.onmouseup = function(ev) { dragging = false; };

  canvas.onmousemove = function(ev) { // Mouse is moved
    var x = ev.clientX, y = ev.clientY;
    if(dragging) {
      var factor = 100/canvas.height; // The rotation ratio
      var dx = factor * (x - lastX);
      var dy = factor * (y - lastY);
      // Limit x-axis rotation angle to -90 to 90 degrees
      currentAngle[0] = currentAngle[0] + dy; //Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
      currentAngle[1] = currentAngle[1] + dx;
    lastX = x, lastY = y;
    }
  };

  canvas.addEventListener("touchstart", function (ev) {
    ev.preventDefault();
    if (ev.targetTouches.length === 1) {
      var touch = ev.targetTouches[0];
      touch.preventDefault = function () { };
      touch.button = 0;
      canvas.onmousedown(touch);
      this.addEventListener("touchmove", roll, false);
      this.addEventListener("touchend", release, false);

      function roll(e) {
        touch = e.targetTouches[0];
        canvas.onmousemove(touch);
      }
      function release() {
        canvas.onmouseup(touch);
        this.removeEventListener("touchmove", roll);
        this.removeEventListener("touchend", release);
      }
    }
  });
}
