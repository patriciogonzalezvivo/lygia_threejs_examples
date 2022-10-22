
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define LAPLACIAN_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.02), vec2(0.98)))
#include "/filter/laplacian.glsl"
#include "/space/ratio.glsl"
#include "/draw/digits.glsl"
#include "/draw/rect.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    float ix = floor(st.x * 5.0);
    float radius = max(1.0, ix * 3.0);

    color += laplacian(u_tex0, st, pixel * radius).rgb * 0.5 + 0.5;

    color -= digits(st - vec2(ix/5.0 + 0.01, 0.01), radius, 0.);
    color -= step(.99, fract(st.x * 5.0));
    color.rgb *= rect(st, 1.0);

    gl_FragColor = vec4(color,1.0);
}
