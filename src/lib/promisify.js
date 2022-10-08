// Here is the magic - this function takes any three.js loader and returns a promisifiedLoader
export default function promisifyLoader ( loader, onProgress ) {

  function promiseLoader ( url ) {

    return new Promise( ( resolve, reject ) => {

      loader.load( url, resolve, onProgress, reject );

    } );
  }

  return {
    originalLoader: loader,
    load: promiseLoader,
  };

}
// EXAMPLE
// Next, we'll convert the GLTFLoader into a GLTFPromiseLoader
// onProgress is optional and we are not using it here
// const GLTFPromiseLoader = promisifyLoader( new THREE.GLTFLoader() );
// GLTFPromiseLoader.load('bla.gltf').then();