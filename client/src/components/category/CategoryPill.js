import React from "react";

export const CategoryPill = ({ category }) => {
  return (
    <div style={{ marginTop: "25px" }}>
      <div
        style={{
          color: "#78f1dd",
          backgroundColor: "#047260",
          padding: "5px",
          width: "150px",
          textAlign: "center",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          fontWeight: 900,
        }}
      >
        {category}
      </div>
      <div className="divider"></div>
    </div>
  );
};
