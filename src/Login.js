import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import ItemsData from "./ItemsData.json";
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    withRouter, Redirect 
  } from "react-router-dom";

function Login(props) {
  const [localAccount, setLocalAccount] = useState();
  const [localPwd, setLocalPwd] = useState();
  const [efforInfo, setEfforInfo] = useState('')
  const [keyinAccount, setKeyinAccount] = useState('')
  const [keyinPwd, setKeyinPwd] = useState('')

  useEffect(() => {
    const a = JSON.stringify(ItemsData);
    localStorage.setItem("ItemDatas", a);

    const LogInInfo = JSON.parse(localStorage.getItem("LodinInfo"));
    setLocalAccount(LogInInfo.account);
    setLocalPwd(LogInInfo.pwd);
  }, []);

  function logInBtn(){
      if( keyinAccount !== localAccount ||  keyinPwd !== localPwd ){
        setEfforInfo('帳號或密碼不正確')
      }else{
        props.history.push('/items')
      }
  }

  return (
    <>
      <div className="login_page">
        聯合智網股份有限公司
        <br />
        <Input type="text" 
            placeholder="使用者編號3-20碼" 
            onChange={(e) => {
                const newAccount = e.target.value
                setKeyinAccount(newAccount)
            }} />
        <Input.Password
          placeholder="密碼6-20碼，英文字母需區分大小寫"
          onChange={(e) => {
              const newPwd = e.target.value
              setKeyinPwd(newPwd)
          }}
        />
        <br />
        <p style={{textAlign:"left", color: "red"}}>{efforInfo}</p>
        <Button style={{ width: "100%", backgroundColor: "#FF8000" }} onClick={logInBtn}>
          登入
        </Button>
        <br />
        <p style={{ textAlign: "left", marginTop: "16px", color: "#FF8000" }}>
          忘記密碼
        </p>
      </div>
    </>
  );
}

export default withRouter(Login);
