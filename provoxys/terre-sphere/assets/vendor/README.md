# Local rendering dependencies

Three.js 0.186.1, fetched from the official npm `three` package on 2026-09-30. MIT license in THREE-LICENSE.txt. Files: three.module.js, its three.core.js dependency, and OrbitControls.js. OrbitControls' bare `three` import is changed to `./three.module.js` so no import map or external network is needed. All other upstream code is unchanged.

Documentation consulted: https://threejs.org/docs/pages/WebGLRenderer.html and https://threejs.org/docs/pages/OrbitControls.html

`../earth-nasa.jpg`: NASA Blue Marble Next Generation, January 2004 monthly surface composite, 5400 × 2700. Source: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/january/world.200401.3x5400x2700.jpg ; description: https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/ . Credit NASA Earth Observatory / Reto Stöckli. NASA imagery is generally available for educational and informational use under https://www.nasa.gov/nasa-brand-center/images-and-media/ ; no NASA endorsement implied. The texture is a composite, not a single photograph. Lighting, rotation, obliquity and amplified flattening are generated illustrations, not observational evidence.

Serve via a local HTTP server for ES modules; all assets remain local and work without internet once served. On browsers without WebGL2, the observatory provides an accessible SVG diagram.
