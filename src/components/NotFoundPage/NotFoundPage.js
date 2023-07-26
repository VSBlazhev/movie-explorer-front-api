import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found__contaner">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>

      <button className="not-found__btn" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
