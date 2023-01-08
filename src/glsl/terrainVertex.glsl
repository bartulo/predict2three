varying vec2 vUv;
uniform sampler2D dataText;

void main()
{
  vUv =  uv;
  vec4 m = texture2D(dataText, uv);
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
