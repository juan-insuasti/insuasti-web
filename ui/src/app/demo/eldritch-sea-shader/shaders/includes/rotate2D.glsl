vec2 rotate2D(vec2 uv, float angle) {
  float cosA = cos(angle);
  float sinA = sin(angle);
  return vec2(uv.x * cosA - uv.y * sinA, uv.x * sinA + uv.y * cosA);
}

#pragma glslify: export(rotate2D)
