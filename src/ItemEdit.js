import React, { useState, useEffect } from "react";
import ItemsData from "./ItemsData.json";
import {
  Layout,
  Row,
  Col,
  Button,
  Breadcrumb,
  Table,
  Divider,
  Tag,
  Pagination,
} from "antd";

import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
  withRouter
} from "react-router-dom";

function ItemEdit(props) {
  //   const [itemDatas, setItemDatas] = useState("");
  const [itemDatasSave, setItemDatasSave] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemDataIndex, setItemDataIndex] = useState("");
  const [newItemDatas, setNewItemDatas] = useState("");
  useEffect(() => {
    const pageUrl = window.location.href;
    const pageUrlSplit = pageUrl.split("/")[4];
    const getItemId = pageUrlSplit.slice(0, 10);
    const getItemSize = pageUrlSplit.slice(10, 15);
    setItemId(getItemId);
    setItemSize(getItemSize);
    // console.log(ItemsData.data[1].id);

    const localData = localStorage.getItem("ItemDatas");
    // setItemDatas(JSON.parse(localData).data);
    setItemDatasSave(localData);

    for (let i = 0; i < JSON.parse(localData).data.length; i++) {
      // console.log(i)
      if (
        JSON.parse(localData).data[i].id === getItemId &&
        JSON.parse(localData).data[i].size === getItemSize
      ) {
        console.log(i);
        setItemDataIndex(i);
        setItemName(JSON.parse(localData).data[i].name);
        setItemBrand(JSON.parse(localData).data[i].brand);
        setItemPrice(JSON.parse(localData).data[i].price);
        setItemColor(JSON.parse(localData).data[i].color);
      }
    }
  }, []);

  function saveBtn() {
    const final = {
      brand: itemBrand,
      name: itemName,
      id: itemId,
      price: itemPrice,
      color: itemColor,
      size: itemSize,
    };
    console.log(itemDatasSave);
    console.log(JSON.parse(itemDatasSave).data.length);

    const newArr = [];
    for (let i = 0; i < JSON.parse(itemDatasSave).data.length; i++) {
      if (i !== itemDataIndex) {
        newArr.push(JSON.parse(itemDatasSave).data[i]);
      } else {
        newArr.push(final);
      }
    }
    console.log(newArr);
    const newData = JSON.parse(itemDatasSave);
    newData.data = newArr;
    console.log(newData);

    localStorage.setItem("ItemDatas", JSON.stringify(newData));
    props.history.push('/items')
    
  }
  const { Content } = Layout;

  return (
    <>
      <Content style={{ padding: "0 20px" }}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>首頁</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理作業</Breadcrumb.Item>
          <Breadcrumb.Item>檢視商品</Breadcrumb.Item>
        </Breadcrumb>
        <div className="itemlist_box">
          <h3>基本資料</h3>
          <hr />
          <p>
            商品序號 <span>{itemId}</span>
          </p>
          <p>
            商品名稱
            <span>
              <input
                value={itemName}
                style={{ width: "30%" }}
                onChange={(e) => {
                  const newName = e.target.value;
                  setItemName(newName);
                }}
              ></input>
            </span>
          </p>
          <p>
            品牌名稱
            <span>
              <input
                value={itemBrand}
                style={{ width: "30%" }}
                onChange={(e) => {
                  const newBrand = e.target.value;
                  setItemBrand(newBrand);
                }}
              ></input>
            </span>
          </p>
          <p>
            價格
            <span>
              <input
                value={itemPrice}
                style={{ width: "30%" }}
                onChange={(e) => {
                  const newPrice = e.target.value;
                  setItemPrice(newPrice);
                }}
              ></input>
            </span>
          </p>
          <p>
            規格一
            <span>
              <input
                value={itemSize}
                style={{ width: "30%" }}
                onChange={(e) => {
                  const newSize = e.target.value;
                  setItemSize(newSize);
                }}
              ></input>
            </span>
          </p>
          <p>
            規格二
            <span>
              <input
                value={itemColor}
                style={{ width: "30%" }}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setItemColor(newColor);
                }}
              ></input>
            </span>
          </p>
        </div>
        <Row style={{ marginTop: "20px" }}>
          <div style={{ margin: "0 auto" }}>
            <Link to="/items">
              <Button style={{ marginRight: "5px" }}>返回列表</Button>
            </Link>
            <Button
              style={{ marginLeft: "5px" }}
              type="primary"
              onClick={saveBtn}
            >
              確定儲存
            </Button>
          </div>
        </Row>
      </Content>
    </>
  );
}

export default withRouter(ItemEdit);
