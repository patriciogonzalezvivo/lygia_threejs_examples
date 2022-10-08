
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform sampler2D   u_lutTex;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define LUT_SQUARE
#define LUT_FLIP_Y
#define LUT_CELL_SIZE 64.0
#define LUT_CELLS_PER_SIDE 8.0
#include "lygia/color/lut.glsl"

void main(void) {
    vec4 color = vec4(0.0);
    vec2 st = v_texcoord;
    
    color = texture2D(u_tex0, st);

    color = lut(u_lutTex, color);

    gl_FragColor = color;
}
