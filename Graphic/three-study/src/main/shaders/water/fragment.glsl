precision lowp float;

varying float vElevation;

void main() {
    float opacity = (vElevation+1.0) / 2.0;
    // gl_FragColor = vec4(0.174, 0.434, 0.392 * opacity, 1.0);
    gl_FragColor = vec4(1.0 * opacity, 1.0 * opacity, 0.0, 1.0);
}