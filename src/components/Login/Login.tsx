import React from "react";
import { Alert, Form, Input, Button } from 'antd';
import "./Login.css"
import { LoginComponentProps } from "../../types/props";
import { loginThunk } from "../../redux/actions/app";
import { LoginFormValues } from "../../types/other";

const LoginComponent = ({ app, dispatch }: LoginComponentProps) => {

  const onFinish = async (values: LoginFormValues) => {
    // console.log('Success:', values);
    const { username, password } = values
    dispatch(loginThunk(username, password))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login_wrapper">
      <div className="login_form">
        <Form
          name="basic"
          initialValues={{ username: app.previousUsername, password: app.previousPassword }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={app.loggingInProgress}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        {app.loginErrorMessage.show &&
          <Alert
            message={app.loginErrorMessage.message}
            type="error"
            showIcon
            closable
          />
        }
      </div>
    </div>
  )
}

export default LoginComponent