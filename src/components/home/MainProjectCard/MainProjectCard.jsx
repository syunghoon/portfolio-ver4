import React from "react";
import { Link } from "react-router-dom";
import "./MainProjectCard.css";

function MainProjectCard({ project }) {
  // Use the first button's link if available, otherwise fallback
  const linkTo = project.buttons?.[0]?.link || `/posts/${project.id}`;

  return (
    <Link to={linkTo} className="main-project-card">
      <h3 className="main-project-card__title">{project.title}</h3>
      <p className="main-project-card__organization">{project.organization}</p>
      <p className="main-project-card__description">{project.description}</p>
    </Link>
  );
}

export default MainProjectCard;
