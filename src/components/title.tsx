import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
function Title() {
  const navigate = useNavigate();
  return (
    <div
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Button type="primary" onClick={() => navigate("/")}>
        Home
      </Button>
    </div>
  );
}
export default Title;
