#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D 	u_tex0;
uniform vec2 		u_resolution;
uniform float 		u_time;

varying vec3 		v_position;
varying vec2 		v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/space/ratio.glsl"

void main()	{
	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
	vec2 pixel = 1.0/u_resolution;
	vec2 uv = v_texcoord;
	vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

	color.rgb = vec3(uv,sin(u_time) * 0.5 + 0.5);

	gl_FragColor = color;
}