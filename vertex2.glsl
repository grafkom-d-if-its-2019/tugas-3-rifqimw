precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scaleX;
uniform float scaleY;

void main() {
  fColor = vColor;
  mat4 scalationMatrix = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = scalationMatrix * vec4(vPosition, 0.0, 1.0);
}
