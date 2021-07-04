import http from "../http-common";

class ShowDataService{
    // Call axios get, post, put, delete method corresponding to HTTP Requests:
    // GET, POST, PUT, DELETE to make CRUD Operations.
    getAll() {
        return http.get("/shows");
    }

    get(id) {
        return http.get(`/shows/${id}`);
    }

    create(data) {
        return http.post("/shows", data);
    }

    update(id, data) {
        return http.put(`/shows/${id}`, data);
    }

    delete(id) {
        return http.delete(`/shows/${id}`);
    }

    deleteAll() {
        return http.delete(`/shows`);
    }

    findByTitle(title) {
        return http.get(`/shows?title=${title}`);
    }
}
export default new ShowDataService();