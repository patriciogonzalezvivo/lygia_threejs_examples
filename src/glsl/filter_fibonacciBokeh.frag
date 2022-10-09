
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/filter/fibonacciBokeh.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/draw/digits.glsl"
#include "lygia/draw/rect.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    float ix = floor(st.x * 5.0);
    float radius = (ix/4.0) * 0.5;
    color += fibonacciBokeh(u_tex0, st, pixel, radius).rgb;

    color -= digits(st - vec2(ix/5.0 + 0.01, 0.01), radius, 2.);
    color -= step(.99, fract(st.x * 5.0));
    color.rgb *= rect(st, 1.0);

    gl_FragColor = vec4(color,1.0);
}
