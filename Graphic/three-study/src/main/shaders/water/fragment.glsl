precision lowp float;

uniform vec3 uLowColor;
uniform vec3 uHightColor;
uniform float uOpacity;

varying float vElevation;

void main() {
    float opacity = (vElevation+1.0) / 2.0;
    vec3 color = mix(uLowColor, uHightColor, opacity);
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(1.0 * opacity, 1.0 * opacity, 0.0, 1.0);
}