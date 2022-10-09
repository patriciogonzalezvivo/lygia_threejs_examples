#ifdef GL_ES
precision highp float;
#endif

varying vec3 v_position;
varying vec2 v_texcoord;

void main() {
    v_texcoord = uv;
    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}