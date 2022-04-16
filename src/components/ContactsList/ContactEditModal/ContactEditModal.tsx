import { Modal, Form, Input } from "antd";
import React from "react";
import { closeContactEditModal, createNewContactThunk, updateContactThunk } from "../../../redux/actions/contacts";
import { EditContactFormValues } from "../../../types/other";
import { ContactEditModalProps } from "../../../types/props";
import "./ContactEditModal.css"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const ContactEditModal = ({ contacts, dispatch }: ContactEditModalProps) => {
  const contact = contacts.editContactModal.data

  const [contactEditForm] = Form.useForm()
  React.useEffect(() => {
    contactEditForm.setFieldsValue({
      name: contact.name,
      surname: contact.surname,
      tel: contact.tel,
      email: contact.email,
    })
  })

  const onFinish = (values: EditContactFormValues) => {
    const updatedContact = { ...contact, ...values }

    if (updatedContact.id) {
      dispatch(updateContactThunk(updatedContact))
    } else {
      dispatch(createNewContactThunk(updatedContact))
    }

    
  }

  return (
    <Modal
      title={contact.id === 0 
        ? `Создание контакта`
        : `Редактирование контакта ${contact.name} ${contact.surname}`}
      visible={contacts.editContactModal.isOpen}
      onOk={() => contactEditForm.submit()}
      onCancel={() => dispatch(closeContactEditModal())}
      // maskTransitionName="" // probably fixes modal close animation
      cancelText="Отменить"
      okText="Сохранить"
      getContainer={false} //  fixes modal close animation
      forceRender
    >

      <div className="contact_edit_modal_form">
        <Form
          {...layout}
          form={contactEditForm}
          name="contact-edit-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true }]}
            initialValue={contact.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Фамилия"
            rules={[{ required: true }]}
            initialValue={contact.surname}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tel"
            label="Телефон"
            initialValue={contact.tel}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            initialValue={contact.email}
          >
            <Input />
          </Form.Item>

        </Form>
      </div>

    </Modal>
  )
}

export default ContactEditModal