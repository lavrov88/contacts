import { Button } from 'antd';
import Title from "antd/lib/typography/Title";
import React from "react";
import { logoutSucceed } from '../../redux/actions/app';
import { HeaderComponentProps } from '../../types/props';
import "./Header.css"

const HeaderComponent = ({ app, dispatch }: HeaderComponentProps) => {
  return (
    <div className="header">
      <div className="header_title">
        <Title>Контакты</Title>
      </div>
      <div className="header_logout">
        {app.isLogged &&
          <Button 
            type="primary"
            onClick={() => dispatch(logoutSucceed())}
            >
            Выйти
          </Button>
        }
      </div>
    </div>
  )
}

export default HeaderComponent