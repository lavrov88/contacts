# Список контактов

Для запуска приложения, нужно ввести в терминале:

### `yarn start`

А также для запуска сервера в другом окне терминала ввести:

### `yarn server`

React-приложение запустится на порту 3000, сервер - на порту 3001.

Для авторизации нужно использовать логин:
### `test@login.ru`
И пароль:
### `123123`


## Кратко о реализации

- Приложение создано с помощью create-react-app.
- В качестве стейт менеджера использован Redux с thunk для асинхронных действий.
- Использован TypeScript для типизации actions, reducers, props.
- Интерфейсные компоненты применены из библиотеки Ant Design.
- В качестве фейкового бэкенда использован json-server и дополнение json-server-auth для ограничения доступа без авторизации.
- Для HTTP запросов использована библиотека Axios.
