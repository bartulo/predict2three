precision highp float;

uniform sampler2D fire;
uniform sampler2D ros;
uniform sampler2D mdt;
uniform sampler2D vel;
uniform sampler2D ang;
uniform float windfactor;

varying vec2 vUv;

void main(void) 
{
  vec2 st = vUv;
  vec2 dx = vec2(0.004, 0.0);
  vec2 dy = vec2(0.0, 0.004);
  vec2 r = gl_FragCoord.xy;

    // ROS
  vec4 rate_of_spread = texture2D(ros, st);

      // FIRE
  vec4 f01 = texture2D(fire, st - dy);
  vec4 f10 = texture2D(fire, st - dx);
  vec4 f11 = texture2D(fire, st);
  vec4 f12 = texture2D(fire, st + dx);
  vec4 f21 = texture2D(fire, st + dy);

  // Fuego alrededores
  float fire_sw = max(f01.r, f10.r);
  float fire_ne = max(f12.r, f21.r);
  float fire_neighbours = max(fire_sw, fire_ne);

  // La siguiente constante equivale a un if. Si hay fuego en una parcela contigua hay fuego. Si no, no
  float cv = step( 0.01,  fire_neighbours );
  
  float f = f11.r + cv * rate_of_spread.r / 10.;
  

  gl_FragColor = vec4( f, 0., 0., 1. );
}
