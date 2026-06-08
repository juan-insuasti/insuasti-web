#define PI 3.1415926535897932384626433832795

uniform float uTime;
varying vec4 vPosition;
varying vec2 vUv;
varying float vStr;

uniform vec3 uMouse;
uniform vec2 uResolution;
uniform vec3 uPointerPosition;
uniform sampler2D uTexture;

float RADIUS = 5.0;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float angle) {
  float cosA = cos(angle);
  float sinA = sin(angle);
  return vec2(uv.x * cosA - uv.y * sinA, uv.x * sinA + uv.y * cosA);
}

vec4 permute(vec4 x) {
  return mod((x * 34.0 + 1.0) * x, 289.0);
}

//	Classic Perlin 2D Noise
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec2 fade(vec2 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm =
    1.79284291400159 -
    0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  // vec4 textureColor = texture2D(uTexture, vUv);
  // vec3 position = vPosition.xyz;
  // position *= 1.0;

  // float green = abs(sin(position.y * 0.1 + uTime));
  // float red = abs(cos(position.x * 0.1 + uTime));
  // float blue = abs(sin(position.z * 0.1 + uTime));
  // float alpha = 1.0;
  // float distanceToPointer = distance(vPosition.xyz, uPointerPosition);
  // if (distanceToPointer < RADIUS) {
  //   alpha = alpha - (RADIUS - distanceToPointer) / RADIUS;
  // }

  // float str = mod(floor(vUv.y * 20.0), 2.0);
  // float str = mod(vUv.x * 10.0, 1.0);

  vec2 uv = vUv;

  // Centered UV
  // vec2 uv = (vUv - 0.5) * 2.0;

  // Repeat
  // uv = mod(uv * 1.0, 1.0);

  // Vertical stripes

  //   float vstr = step(0.8, uv.x);
  //   float hstr = step(0.8, uv.y);
  //   float grid = vstr + hstr;

  // // Inverted Centered Stripes
  //   float vstr2 = 1.0 - (step(0.2, uv.x) - step(0.6, uv.x));
  //   float hstr2 = 1.0 - (step(0.2, uv.y) - step(0.6, uv.y));

  //  // Cross
  //  float cross = grid * vstr2 * hstr2;

  // reflected center
  // float str = abs(cos(uv.x * 3.14159));
  // Min/Max Cross
  // float str = min(abs(0.5 - uv.x), abs(0.5 - uv.y));
  // float maxCross = max(abs(0.5 - uv.x), abs(0.5 - uv.y));
  // float square = step(0.3, maxCross);
  // float squareInverted = step(maxCross, 0.4);

  // Square in the middle
  // stripe In the middle
  // float vMiddleStripe = step(0.4, abs(uv.x));
  // float hMiddleStripe = step(0.4, abs(uv.y));

  // float str = max(vMiddleStripe, hMiddleStripe);
  // float str = square * squareInverted;

  // float vStripes = floor(uv.x * 10.0) / 10.0;
  // float hStripes = floor((uv.y + uv.x * 0.5) * 10.0) / 10.0;

  // // Noise
  // float noise = random(vec2(vStripes, hStripes));
  // float str = noise;

  //radial
  // float len = length(uv);
  // float dist = 0.01 / distance(vec2(uv.x, uv.y), vec2(0.5));
  // float str = dist;

  // Wavy distortion
  // uv += vec2(sin(uv.y * 100.0 + uTime) * 0.05, cos(uv.x * 200.0 + uTime) * 0.05);

  // float dist = distance(uv, vec2(0.5));
  // float str = step(abs(dist - 0.25), 0.02); // Adjust the multiplier to control the thickness of the ring

  // Radial Stripes
  // uv -= vec2(0.5);
  // uv *= 2.0; // Scale to [-1, 1]
  // uv = rotate(uv, 0.5);
  // float angle = atan(uv.y, uv.x);
  // angle /= 2.0 * PI;
  // angle += 0.5; // Shift to [0, 1] range

  // angle = sin(fract(angle * 20.0) * 2.0 * PI); // Create 10 segments

  // float str = angle * 0.05;

  // // Wavy distortion 2
  // // uv += vec2(uv.y * 2.0 * PI + ) * 0.05, cos) * 0.05);

  // float radius = 0.25 + angle * 0.05; // Base radius plus distortion based on angle

  // float dist = distance(uv, vec2(0.0));
  // float str = step(abs(dist - radius), 0.01); // Adjust the multiplier to control the thickness of the ring

  // float str = cos(cnoise(uv * 5.0) * 10.0 + uTime * 0.3);

  float str = vStr;

  vec3 blackColor = vec3(0.1);
  vec3 darkColor = vec3(0.17);
  //(1f, 0.27f, 0.06f, 1f)
  vec3 brightColor = vec3(1.0, 0.5, 0.1);
  vec3 redColor = vec3(1.0, 0.0, 0.0);

  // vec3 uvColor = vec3(rotate(uv, uTime), 1.0);
  vec3 mixedColor1 = mix(darkColor, brightColor, clamp(str, 0.0, 1.0));

  if (vPosition.y < 0.1) {
    mixedColor1 = mix(brightColor, redColor, clamp(str, 0.0, 1.0));
  }

  if (vPosition.y > 0.1) {
    mixedColor1 = mix(
      blackColor,
      darkColor,
      clamp(0.8 - pow(vPosition.y, 0.5) + random(vUv) * 0.1, 0.0, 1.0)
    );
  }

  vec3 mixedColor = mixedColor1;

  gl_FragColor = vec4(mixedColor, 1.0);

  // gl_FragColor = vec4(str, str, str, 1.0);

  #include <tonemapping_fragment>
  // #include <colorspace_fragment>
}
