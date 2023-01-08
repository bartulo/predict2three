precision highp float;

uniform sampler2D fire;
uniform sampler2D topo;

varying vec2 vUv;

void main(void) 
{
  vec2 st = vUv;

  vec3 colorA = vec3(0., 1., 0.);
  vec3 colorB = vec3(1., 0., 0.);

  vec4 fire = texture2D(fire, st);
  vec4 o = texture2D(topo, st);

  vec3 pct = vec3(0., 0., 0.);
  
  pct.x = smoothstep(1., 0., pow(fire.x, 5.));
  pct.y = cos(fire.x*3.1415*2.1)/2. + 0.5;

  float mixer = (0.01, 1., fire.x); 

  vec3 color = mix(colorA, colorB, pct);

  vec3 final = mix(o.rgb, color, mixer);

//  gl_FragColor = vec4( fire.r, fire.g, fire.b, 1.0 );
//  gl_FragColor = ((1. - 0.2) * fire.g + 0.2) * o;
//  gl_FragColor = vec4(color.r, color.g, o.b, 1);
  gl_FragColor = vec4(final, 1.);
}
