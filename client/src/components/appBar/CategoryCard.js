import React from "react";

export const CategoryCard = ({ category, navigate, visible }) => {
  return (
    <div
      className="category_card"
      onClick={() => {
        navigate(`/category/${category.link}`);
        visible(false);
      }}
    >
      <div className="category_text">{category.text}</div>
      <div className="category_icon">{category.icon}</div>
    </div>
  );
};
