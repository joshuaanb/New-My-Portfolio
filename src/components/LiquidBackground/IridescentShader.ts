import * as THREE from 'three';

const IridescentShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff") },
    uBrightness: { value: 0.5 },
    uTransition: { value: 0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uTransition;

    // Helper for iridescent colors
    vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
        return a + b*cos( 6.28318*(c*t+d) );
    }

    void main() {
      vec3 normal = normalize(vNormal + 0.00001); // Avoid zero normal
      vec3 viewDir = normalize(vViewPosition + 0.00001); // Avoid zero vector
      
      // Fresnel effect for iridescence - softer for better wrapping
      float dotProduct = dot(normal, viewDir);
      float fresnel = pow(clamp(1.0 - abs(dotProduct), 0.0, 1.0), 3.0);
      
      // Premium "Soap Bubble" palette
      // palette(t, a, b, c, d)
      vec3 iridescentColor = pal(fresnel + uTime * 0.1, 
                                 vec3(0.5, 0.5, 0.5), 
                                 vec3(0.5, 0.5, 0.5), 
                                 vec3(1.0, 1.0, 1.0), 
                                 vec3(0.0, 0.33, 0.67));
                                 
      float alpha = clamp(fresnel * 2.0 + uTransition * 0.5, 0.1, 1.0);
      
      // Add a "white flash" or intensity boost during transition
      vec3 finalColor = mix(iridescentColor * uColor, vec3(1.0), uTransition * 0.3);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export default IridescentShader;
