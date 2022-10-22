
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

varying vec2        v_texcoord;

#include "/space/ratio.glsl"
#include "/generative/snoise.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    float d2 = snoise(vec2(st * 5. + u_time)) * 0.5 + 0.5;
    float d3 = snoise(vec3(st * 5., u_time)) * 0.5 + 0.5;
    
    color += mix(d2, d3, step(0.5, st.x));

    gl_FragColor = color;
}
