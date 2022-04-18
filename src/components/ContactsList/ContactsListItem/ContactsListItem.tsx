import { Dispatch } from "@reduxjs/toolkit";
import { Avatar, Button, Descriptions, List, message, Popconfirm, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { deleteContactThunk, openContactEditModal } from "../../../redux/actions/contacts";
import { ContactDescriptionItemType, ContactsListItemPropsType, ContactTitleItemType } from "../../../types/props";
import { UserOutlined } from "@ant-design/icons";


const ContactTitleItem = ({ name, surname, dispatch, id }: ContactTitleItemType) => {

  const deleteHandler = (dispatch: Dispatch<any>, id: number) => {
    dispatch(deleteContactThunk(id))
    message.info('Удаляем контакт...')
  }

  return (
    <div
      className="contact_title"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="contact_title__name">
      <Title level={5}>{name} {surname}</Title>
      </div>
      <div className="contact_title__buttons">
        <Space size="small">
          <Button
            size="small"
            onClick={() => dispatch(openContactEditModal(id))}
          >
            Редактировать
          </Button>
          <Popconfirm
            title={"Вы уверены, что хотите удалить контакт " + name + " " + surname + "?"}
            onConfirm={() => deleteHandler(dispatch, id)}
            placement="bottomLeft"
            okText="Да"
            cancelText="Нет"
          >
            <Button
              size="small"
              danger
            >
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      </div>
    </div>
  )
}

const ContactDescriptionItem = ({ name, surname, tel, email }: ContactDescriptionItemType) => {
  return (
    <Descriptions size={"small"} column={2} >
      <Descriptions.Item label="Имя">{name}</Descriptions.Item>
      <Descriptions.Item label="Фамилия">{surname}</Descriptions.Item>
      {tel && <Descriptions.Item label="Телефон">{tel}</Descriptions.Item>}
      {email && <Descriptions.Item label="Email">{email}</Descriptions.Item>}
    </Descriptions>
  )
}

const ContactsListItem = ({ c, dispatch }: ContactsListItemPropsType) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={<ContactTitleItem
          name={c.name}
          surname={c.surname}
          dispatch={dispatch}
          id={c.id}
        />}
        description={
          <ContactDescriptionItem
            key={c.id}
            name={c.name}
            surname={c.surname}
            tel={c.tel}
            email={c.email}
          />
        }
      />
    </List.Item>
  )
}

export default ContactsListItem