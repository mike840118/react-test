import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import menuData from "./menu.json";

const { SubMenu, ItemGroup, Item } = Menu;

const MenuComponent: React.FC = () => {
  const [current, setCurrent] = useState<string>("1");

  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const renderMenuItems = (items: any[]) =>
    items.map((item) => {
      if (item.children) {
        if (item.type === "group") {
          return (
            <ItemGroup key={item.key} title={item.title}>
              {renderMenuItems(item.children)}
            </ItemGroup>
          );
        }
        return (
          <SubMenu key={item.key} title={<span>{item.title}</span>}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return <Item key={item.key}>{item.title}</Item>;
    });

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 240, height: "100vh" }}
      defaultOpenKeys={["sub1"]}
      selectedKeys={[current]}
      mode="inline"
    >
      {renderMenuItems(menuData)}
    </Menu>
  );
};

export default MenuComponent;