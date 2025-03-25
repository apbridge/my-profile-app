import style from "../styles/card.module.css";
import PropTypes from "prop-types";
import {useRef, useEffect, memo} from "react";

const Card = memo (({ image_url, name, title, email }) => {
  const renderCounter = useRef(0);
  useEffect(() => {
    renderCounter.current = renderCounter.current + 1;
    console.log("Card rendered", renderCounter.current);
  });
  return (
    <div
      className={`${style["profile-card"]} ${style["is-entering"]}`}
    >
      <div className={style["profile-card__image"]}>
        <img src={image_url} alt={name} />
      </div>
      <div className={style["profile-card__content"]}>
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </div>
  );
});
Card.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
};
export default Card;