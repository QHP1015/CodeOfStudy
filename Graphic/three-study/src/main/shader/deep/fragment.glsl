precision highp float;

varying vec2 vUv;


void main() {

    // 1.通过顶点对应的uv，决定每一个像素在uv图像的位置，通过这个位置x，y决定颜色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // 2.第一种变形
    // gl_FragColor = vec4(vUv, 1, 1);

    // 3.利用uv实现渐变效果
    float strength = vUv.x;
    gl_FragColor = vec4(strength, strength, strength, 1);
}