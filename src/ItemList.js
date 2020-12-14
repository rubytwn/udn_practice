import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Breadcrumb,
  Table,
  Pagination,
} from "antd";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ItemsData from "./ItemsData.json";
import Edit from "./edit.svg";
import Copy from "./file.svg";
import View from "./view.svg";
import ImageSVG from "./image.svg";
import ItemDetail from "./ItemDetail";

function ItemList() {
  const [itemDatas, setItemDatas] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("ItemDatas");
    setItemDatas(JSON.parse(localData).data);
    // console.log(JSON.parse(itemDatas).data)
  }, []);

  const { Content } = Layout;
  const { Column } = Table;

  // let { path, url } = useRouteMatch()

  function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  const all = (
    <>
      <Table dataSource={itemDatas}>
        <Column
          title="商品圖"
          dataIndex=""
          key=""
          render={(text, record) => (
            <img src={ImageSVG} alt="" style={{ width: "20px" }} />
          )}
        />
        <Column title="品牌名稱" dataIndex="brand" key="brand" />
        <Column title="商品編號" dataIndex="id" key="id" />
        <Column title="商品名稱" dataIndex="name" key="name" />
        <Column title="價格" dataIndex="price" key="price" />
        <Column title="規格一" dataIndex="size" key="size" />
        <Column title="規格二" dataIndex="color" key="color" />
        <Column
          title="動作"
          key="action"
          render={(text, record) => (
            <span>
              {/* <Link to={`${url}/itemdetail${text.id+text.size}`}> */}
              <Link to={`itemdetail/${text.id + text.size}`}>
                <img
                  src={View}
                  alt=""
                  style={{ width: "15px", marginRight: "15px" }}
                  id={text.id + text.size}
                />
              </Link>
              <Link to={`itemedit/${text.id + text.size}`}>
                <img
                  src={Edit}
                  alt=""
                  style={{ width: "15px", marginRight: "15px" }}
                />
              </Link>
            </span>
          )}
        />
      </Table>
    </>
  );

  const newArr = [];
  for (let i = 0; i < itemDatas.length; i++) {
    if (itemDatas[i].id === idSearch || itemDatas[i].name === nameSearch) {
      newArr.push(itemDatas[i]);
    }
  }
  const isSearch = idSearch === "" && nameSearch === "";
  const search = (
    <>
      <Table dataSource={newArr}>
        <Column
          title="商品圖"
          dataIndex=""
          key=""
          render={(text, record) => (
            <img src={ImageSVG} alt="" style={{ width: "20px" }} />
          )}
        />
        <Column title="品牌名稱" dataIndex="brand" key="brand" />
        <Column title="商品編號" dataIndex="id" key="id" />
        <Column title="商品名稱" dataIndex="name" key="name" />
        <Column title="價格" dataIndex="price" key="price" />
        <Column title="規格一" dataIndex="size" key="size" />
        <Column title="規格二" dataIndex="color" key="color" />
        <Column
          title="動作"
          key="action"
          render={(text, record) => (
            <span>
              <Link to={`itemdetail/${text.id + text.size}`}>
                <img
                  src={View}
                  alt=""
                  style={{ width: "15px", marginRight: "15px" }}
                  id={text.id + text.size}
                />
              </Link>
              <Link to={`itemedit/${text.id + text.size}`}>
                <img
                  src={Edit}
                  alt=""
                  style={{ width: "15px", marginRight: "15px" }}
                />
              </Link>
            </span>
          )}
        />
      </Table>
    </>
  );

  return (
    <>
      <Content style={{ padding: "0 20px" }}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>首頁</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理作業</Breadcrumb.Item>
          <Breadcrumb.Item>列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="itemlist_box itemlist_top">
          <Row>
            <Col span={12}>
              商品編號：
              <input
                placeholder="請輸入"
                style={{ width: "80%" }}
                value={idSearch}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setIdSearch(newSearch);
                }}
              ></input>
            </Col>
            <Col span={12}>
              商品名稱：
              <input
                placeholder="請輸入"
                style={{ width: "80%" }}
                value={nameSearch}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setNameSearch(newSearch);
                }}
              ></input>
            </Col>
          </Row>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Row style={{ textAlign: "center" }}>
              <div style={{ margin: "0 auto" }}>進階搜尋</div>
            </Row>
            <Row>
              <div style={{ margin: "0 auto" }}>
                <Button style={{ marginRight: "5px" }}>重設</Button>
                <Button style={{ marginLeft: "5px" }} type="primary">
                  搜尋
                </Button>
              </div>
            </Row>
          </div>
        </div>
        <div
          className="itemlist_box"
          style={{ textAlign: "right", width: "100%" }}
        >
          <Button style={{ marginRight: "5px" }}>匯入商品</Button>
          <Button style={{ marginLeft: "5px" }} type="primary">
            新增
          </Button>
        </div>
        <div className="itemlist_box">
        {isSearch === true ? all : search}
        </div>
      </Content>
    </>
  );
}

export default ItemList;
