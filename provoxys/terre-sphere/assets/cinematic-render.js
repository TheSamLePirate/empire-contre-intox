/* HDR scene + restrained highlight diffusion. No extra WebGL context.
   Eco and disabled decorative effects use the original direct render path. */
export function createCinematicRender(T,renderer){
 const supported=renderer.extensions.has('EXT_color_buffer_float');
 if(!supported)return {render:(scene,camera)=>renderer.render(scene,camera),supported:false};
 const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,samples:2,depthBuffer:true});
 const blur=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:false});
 const camera=new T.OrthographicCamera(-1,1,1,-1,0,1),scene=new T.Scene();
 const vertexShader='varying vec2 uvScreen;void main(){uvScreen=uv;gl_Position=vec4(position.xy,0.,1.);}';
 const spread=new T.ShaderMaterial({depthTest:false,depthWrite:false,toneMapped:false,uniforms:{image:{value:target.texture},texel:{value:new T.Vector2()}},vertexShader,fragmentShader:`varying vec2 uvScreen;uniform sampler2D image;uniform vec2 texel;void main(){vec3 sum=vec3(0.);float weight=0.;for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){float w=exp(-float(x*x+y*y)*.32);vec3 c=texture2D(image,uvScreen+vec2(float(x),float(y))*texel*3.).rgb;float l=max(c.r,max(c.g,c.b));sum+=c*smoothstep(.95,2.1,l)*w;weight+=w;}}gl_FragColor=vec4(sum/weight,1.);}`});
 const finish=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{image:{value:target.texture},bloom:{value:blur.texture},texel:{value:new T.Vector2()},strength:{value:.13}},vertexShader,fragmentShader:`varying vec2 uvScreen;uniform sampler2D image;uniform sampler2D bloom;uniform vec2 texel;uniform float strength;void main(){vec3 c=texture2D(image,uvScreen).rgb;vec3 glow=texture2D(bloom,uvScreen).rgb*.4;glow+=(texture2D(bloom,uvScreen+vec2(texel.x,0.)).rgb+texture2D(bloom,uvScreen-vec2(texel.x,0.)).rgb+texture2D(bloom,uvScreen+vec2(0.,texel.y)).rgb+texture2D(bloom,uvScreen-vec2(0.,texel.y)).rgb)*.15;gl_FragColor=vec4(c+glow*strength,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});
 const quad=new T.Mesh(new T.PlaneGeometry(2,2),spread);quad.frustumCulled=false;scene.add(quad);const size=new T.Vector2();let width=0,height=0;
 return{supported:true,render(world,view,quality,enabled){if(quality===1||!enabled){renderer.setRenderTarget(null);renderer.render(world,view);return;}renderer.getDrawingBufferSize(size);if(size.x!==width||size.y!==height){width=size.x;height=size.y;target.setSize(width,height);blur.setSize(Math.max(1,Math.round(width/4)),Math.max(1,Math.round(height/4)));spread.uniforms.texel.value.set(1/width,1/height);finish.uniforms.texel.value.set(4/width,4/height);}renderer.setRenderTarget(target);renderer.render(world,view);quad.material=spread;renderer.setRenderTarget(blur);renderer.render(scene,camera);quad.material=finish;renderer.setRenderTarget(null);renderer.render(scene,camera);},dispose(){target.dispose();blur.dispose();spread.dispose();finish.dispose();quad.geometry.dispose();}};
}
