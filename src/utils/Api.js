export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) return res.json();
      else return Promise.reject(res.status);
    }
  
    createUser({name, email, password }) {
      return fetch(`${this.baseUrl}/signup`, {
        method: "POST",
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
            name: name,
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    loginUser({ email, password }) {
      return fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(this._checkResponse)
        .then((data) => {
          return data;
        });
    }
  
    checkAuth() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      })
        .then(this._checkResponse)
        .then((data) => data);
    }
    
    getUserId(){
      return fetch(`${this.baseUrl}/users/me`, {
         headers: this.headers,
         credentials: 'include',
      })
      .then(this._checkResponse)
  }

    logOut(){
      return fetch(`${this.baseUrl}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      })
        .then(this._checkResponse)
        .then((data) => data);
    }

    patchUserInfo({name, email}){
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',
         body: JSON.stringify({
            name: name,
            email: email
          })
        })
         .then(this._checkResponse)
    }

    getSavedMovies(){
      return fetch(`${this.baseUrl}/movies`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
    }

    saveMovie(movie){
      return fetch(`${this.baseUrl}/movies`, {
        method: "POST",
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year:movie.year,
          description:movie.description,
          image:`https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail:`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` ,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
      })
      .then(this._checkResponse)
    }

    deleteMovie(id){
      return fetch(`${this.baseUrl}/movies/${id}`,{
        method: "DELETE",
        headers:this.headers,
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
  }
  
  const api = new Api({
    baseUrl: 'https://blazhev.mov-exp.nomoreparties.sbs',
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default api;