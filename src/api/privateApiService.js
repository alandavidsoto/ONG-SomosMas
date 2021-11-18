import axios from "axios";

export default class PrivateApiService {
  httpClient = axios.create({
    baseURL: `http://ongapi.alkemy.org/api/`,
  });
  _endpoint;

  constructor(endpoint) {
    this._endpoint = endpoint;
    return this;
  }
  getAll() {
    return this.httpClient.get(`/${this._endpoint}`);
  }

  getByID(id) {
    return this.httpClient.get(`/${this._endpoint}/${id}`);
  }

  update(id, data, route = "") {
    const path = !!route ? route : this._endpoint;
    const getHeader = this.headerHTTP();
    return this.httpClient.patch(`/${path}/${id}`, data, getHeader);
  }

  create(data) {
    return this.httpClient.post(`/${this._endpoint}`, data);
  }

  delete(id) {
    return this.httpClient.delete(`/${this._endpoint}/${id}`);
  }

  Get(route, id = null) {
    const getHeader = this.headerHTTP();
    if (id) {
      return this.httpClient.get(`/${route}/${id} `, getHeader);
    } else {
      return this.httpClient.get(`/${route}`, getHeader);
    }
  }

  makePrivatePostTo(route, data, token) {
    return this.httpClient.post(route, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  headerHTTP() {
    const token = localStorage.getItem("token");
    if (token) {
      return {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    } else return null;
  }

  makePrivatePutTo(route, id, data) {
    const headers = this.headerHTTP();
    // PUT API routes receive an ID in the params
    return this.httpClient.put(`${route}/${id}`, { ...data, id }, headers);
  }
  makeDelete(route, id) {
    const path = !!route ? route : this._endpoint;
    const headers = this.headerHTTP();
    return this.httpClient.delete(`${path}/${id}`, headers);
  }
}
