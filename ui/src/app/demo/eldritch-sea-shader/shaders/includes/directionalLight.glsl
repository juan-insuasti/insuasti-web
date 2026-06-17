vec3 directionalLight(
  vec3 lightColor,
  float lightIntensity,
  vec3 lightPosition,
  vec3 vNormal,
  vec3 viewPosition,
  vec3 viewDirection,
  float specularPower
) {
  vec3 normal = vNormal;
  // Light direction is the vector from the light position to the object position. (view position)
  // vec3 lightDirection = normalize(lightPosition - viewPosition);
  vec3 lightDirection = normalize(-lightPosition);

  // Reflection of the incidence from the light direction and the normal
  vec3 lightReflection = reflect(-normalize(lightPosition), normal);

  // Specular (shining)
  float specular = -dot(viewDirection, lightReflection);
  specular = max(specular, 0.0);
  specular = pow(specular, specularPower);
  // specular = clamp(specular, 0.0, 1.0);

  // Shading
  float shading = dot(normal, lightDirection);
  shading = max(shading, 0.0);
  // return vec3(specular);
  return lightColor * lightIntensity * (shading + specular);
}

#pragma glslify: export(directionalLight)
