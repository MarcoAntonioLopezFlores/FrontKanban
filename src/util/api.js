const BASE_URL = "http://localhost:8090/APIKanban/"


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  projects: {
    list() {
      return callApi('project/lista');
    },
    getOne(idProject){
      return callApi(`project/obtener/${idProject}`);
    }
    ,
    create(project) {
      return callApi(`project/registrar`, {
        method: 'POST',
        body: JSON.stringify(project),
      });
    },
    update(projectUpdates) {
      return callApi(`project/actualizar`, {
        method: 'PUT',
        body: JSON.stringify(projectUpdates),
      });
    },

    /*remove(projectId) {
      return callApi(`project/eliminar/${projectId}`, {
        method: 'DELETE',
      });
    },*/
  },
  teams: {
    create(team) {
      return callApi(`team/registrar`, {
        method: 'POST',
        body: JSON.stringify(team),
      });
    },
    getByProject(idProject){
      return callApi(`team/lista/${idProject}`)
    },
    getByRol(idProject,rol){
      return callApi(`team/lista/${idProject}/${rol}`);
    },
  },
  products: {
    create(product) {
      return callApi(`product/registrar`, {
        method: 'POST',
        body: JSON.stringify(product),
      });
    },
    getByProject(idProject){
      return callApi(`product/lista/${idProject}`)
    },
    updateStatusProduct(product){
      return callApi(`product/actualizar/status`, {
        method: 'PUT',
        body: JSON.stringify(product),
      });
    }
  }
};

export default api;
