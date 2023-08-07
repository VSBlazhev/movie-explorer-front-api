export class BeatApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers
    }).then(this._checkResponse);
  }
}
export const beatApi = new BeatApi ({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      "Content-Type": "application/json",
    },
  });
