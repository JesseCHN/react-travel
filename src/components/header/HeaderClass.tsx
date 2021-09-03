// @ts-nocheck
import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import store, { RootState } from '../../redux/store';
import { LanguageState } from '../../redux/language/languageReducer'
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions'
import { connect } from 'react-redux'// connect本身就是个高级组件，两个参数，store的链接数据，第二个参数组件本身
import { withTranslation, WithTranslation } from "react-i18next";
import { Dispatch } from "redux";

// interface State extends LanguageState { }


const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = RouteComponentProps & // react-router 路由props类型
  WithTranslation & // i18n props类型
  ReturnType<typeof mapStateToProps> & // redux store 映射类型 
  ReturnType<typeof mapDispatchToProps>; // redux dispatch 映射类型 


class HeaderComponent extends React.Component<PropsType>{
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState()
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   }
  //   store.subscribe(this.handleStoreChange)
  // }

  // handleStoreChange = () => {
  //   console.log(2222222)
  //   const storeState = store.getState()
  //   console.log('ddsadajskl', storeState)
  //   this.setState({
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   })
  // }

  menuClickHandle = (e) => {
    console.log('djaskdjal',e)
    // this.setState({ language: e.key})
    if (e.key === 'new') {
      // 处理新语言添加
      // const action = addLanguageActionCreator('新语言', new_lang)
      // store.dispatch(action)
      this.props.addLanguage('新语言', new_lang)
    }
    else
    {
      // const action = changeLanguageActionCreator(e.key)
      // store.dispatch(action)
      this.props.changeLanguage(e.key)
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={ this.menuClickHandle}>
                  {this.props.languageList.map((l) => <Menu.Item key={l.code}>{l.name}</Menu.Item>)}
                  <Menu.Item key={'new'}>添加新语言</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh'? '中文': '英语'}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("register")}>注册</Button>
              <Button onClick={() => history.push("signIn")}>登陆</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              React旅游网
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={"请输入旅游目的地、主题、或关键字"}
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key={1}>旅游首页</Menu.Item>
          <Menu.Item key={2}>周末游</Menu.Item>
          <Menu.Item key={3}>跟团游</Menu.Item>
          <Menu.Item key="4"> 自由行 </Menu.Item>
          <Menu.Item key="5"> 私家团 </Menu.Item>
          <Menu.Item key="6"> 邮轮 </Menu.Item>
          <Menu.Item key="7"> 酒店+景点 </Menu.Item>
          <Menu.Item key="8"> 当地玩乐 </Menu.Item>
          <Menu.Item key="9"> 主题游 </Menu.Item>
          <Menu.Item key="10"> 定制游 </Menu.Item>
          <Menu.Item key="11"> 游学 </Menu.Item>
          <Menu.Item key="12"> 签证 </Menu.Item>
          <Menu.Item key="13"> 企业游 </Menu.Item>
          <Menu.Item key="14"> 高端游 </Menu.Item>
          <Menu.Item key="15"> 爱玩户外 </Menu.Item>
          <Menu.Item key="16"> 保险 </Menu.Item>
        </Menu>
      </div>
    )
    
  }
  
};

export const Header = connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderComponent))