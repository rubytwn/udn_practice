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
  withRouter, Redirect 
} from "react-router-dom";

function ItemDetail(props) {
    // let { path, url } = useRouteMatch()

//   const [itemDatas, setItemDatas] = useState("")
  const [itemId, setItemId] = useState("")
  const [itemSize, setItemSize] = useState("")
  const [itemName, setItemName] = useState("")
  const [itemBrand, setItemBrand] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemColor, setItemColor] = useState("")
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

    for (let i = 0; i < JSON.parse(localData).data.length; i++) {
      // console.log(i)
      if (JSON.parse(localData).data[i].id === getItemId && JSON.parse(localData).data[i].size === getItemSize) {
        console.log(i);
        setItemName(JSON.parse(localData).data[i].name);
        setItemBrand(JSON.parse(localData).data[i].brand);
        setItemPrice(JSON.parse(localData).data[i].price);
        setItemColor(JSON.parse(localData).data[i].color);
      }
    }
  }, []);
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
            商品名稱 <span>{itemName}</span>
          </p>
          <p>
            品牌名稱 <span>{itemBrand}</span>
          </p>
          <p>
            價格 <span>{itemPrice}</span>
          </p>
          <p>
            規格一 <span>{itemSize}</span>
          </p>
          <p>
            規格二 <span>{itemColor}</span>
          </p>
        </div>
        <Row style={{ marginTop: "20px" }}>
          <div style={{ margin: "0 auto" }}>
            <Link to="/items">
              <Button style={{ marginRight: "5px" }}>返回列表</Button>
            </Link>
            <Link to={`itemedit/${itemId + itemSize}`}>
              <Button 
              style={{ marginLeft: "5px" }} 
              type="primary" 
              onClick={()=>{
                // <Redirect to={`itemedit/${itemId + itemSize}`}/>
              }}>
                編輯修改
              </Button>
            </Link>
          </div>
        </Row>
      </Content>
    </>
  );
}

export default withRouter(ItemDetail);
