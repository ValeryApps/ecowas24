import React from "react";
import { CategoryCard } from "./CategoryCard";

export const CategoriesMenu = ({ categories, navigate, visible }) => {
  return (
    <div className="categoryMenu">
      {categories.map((category) => (
        <CategoryCard
          navigate={navigate}
          visible={visible}
          category={category}
          key={category.link}
        />
      ))}
    </div>
  );
};
