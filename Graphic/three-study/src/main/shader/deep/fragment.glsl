precision highp float;

varying vec2 vUv;


void main() {

    // 1.通过顶点对应的uv，决定每一个像素在uv图像的位置，通过这个位置x，y决定颜色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // 2.第一种变形
    // gl_FragColor = vec4(vUv, 1, 1);

    // 3.利用uv实现渐变效果，从左到右
    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 4.利用uv实现渐变效果，从下到上
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 5.利用uv实现渐变效果，从上到下
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 6.通过取模达到反复效果
    // float strength = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 7.使用step(edge,x)函数，如果x < edge，返回0.0，否则返回1.0
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength == step(0.5, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 8.使用step(edge,x)函数，条纹相加
    float strength = step(0.5, mod(vUv.x * 10.0, 1.0));
    strength += step(0.5, mod(vUv.y * 10.0, 1.0));
    gl_FragColor = vec4(strength, strength, strength, 1);



}