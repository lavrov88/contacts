import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/lib/input/Search";
import React, { ChangeEvent } from "react";
import { fetchContactsThunk, openContactEditModal, setSearchValue } from "../../../redux/actions/contacts";
import { SearchAndAddPropsType } from "../../../types/props";
import "./SearchAndAdd.css"


const SearchAndAdd = ({ dispatch, searchValue }: SearchAndAddPropsType) => {

  const searchHandler = (value: string) => {
    dispatch(setSearchValue(value))
    dispatch(fetchContactsThunk())
  }

  const emplyValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) {
      searchHandler('')
    }
  }

  return (
    <div className="search_and_add_toolbar">
      <Search 
        placeholder="Поиск по всем полям" 
        enterButton
        onSearch={searchHandler}
        defaultValue={searchValue}
        onChange={emplyValueHandler}
      />
      
      <Button onClick={() => dispatch(openContactEditModal(0))}>
        <UserAddOutlined />Добавить контакт
      </Button>
    </div>
  )
}

export default SearchAndAdd