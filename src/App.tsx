import React from 'react';
import './App.css';
import { Col, Layout, Row } from 'antd';
import HeaderComponent from './components/Header/Header';
import LoginComponent from './components/Login/Login';
import ContactList from './components/ContactsList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
const { Header, Content } = Layout;

function App() {
  const { app, contacts } = useSelector((state: RootState) => {
    return {
      app: state.app,
      contacts: state.contacts
    }
  })
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Layout>
        <Header>
          <Row>
            <Col span={24}>
              <HeaderComponent app={app} dispatch={dispatch} />
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={24}>
              {!app.isLogged && <LoginComponent app={app} dispatch={dispatch} /> }
              {app.isLogged && <ContactList app={app} contacts={contacts} dispatch={dispatch}  />}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
