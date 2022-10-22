
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define MEDIAN_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.01), vec2(0.99)))
#include "/filter/median.glsl"
#include "/space/ratio.glsl"
#include "/draw/digits.glsl"
#include "/draw/stroke.glsl"
#include "/draw/rect.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    float radius = fract(st.x * 2.0) * 4.0;

    color = mix( median3(u_tex0, st, pixel * max(1., floor(radius))).rgb,
                 median5(u_tex0, st, pixel * max(1., floor(radius))).rgb, 
                 step(.5, st.x));

    color += digits(st - vec2(0.01 + 0.5 * step(.5, st.x), 0.01), mix(3., 5., step(.5, st.x)), 0.0);
    color -= stroke(st.x, .5, pixel.x * 2.0);

    color -= step(1.0 - pixel.x * 5., fract(radius)) * 0.1;
    color.rgb *= rect(st, 1.0);

    gl_FragColor = vec4(color,1.0);
}
