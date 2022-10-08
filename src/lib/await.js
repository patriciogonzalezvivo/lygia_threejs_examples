var loader = new OBJLoader();

function modelLoader(url) {
  return new Promise((resolve, reject) => {
    loader.load(url, data=> resolve(data), null, reject);
  });
}

const model = await modelLoader("./sailor-moon/gunter.obj");