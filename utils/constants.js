const URL_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const BAD_REQUEST = 'Неккоректные данные';
const EMAIL_ERROR = 'Почта уже используется';
const LOGOUT_SUCCESS = 'Пока!';
const USER_ERROR = 'Пользователь не существует';
const MOVIE_ERROR = 'Фильм не существует';
const DELETE_MOVIE_ERROR = 'Вы не можите удалить фильм';
const AUTHORIZATION_ERROR = 'Ошибка авторизации';
const INTERNAL_SERVER_ERROR = 'Ошибка сервера';
const URL_ERROR = 'URL не существует';
const MOVIES_ERROR = 'Список фильмов пуст. Добавьте фильмы в ваш список';
const EMAIL_PASSWORD_ERROR = 'Неправильные почта или пароль';

module.exports = {
  EMAIL_PASSWORD_ERROR,
  EMAIL_ERROR,
  LOGOUT_SUCCESS,
  MOVIE_ERROR,
  USER_ERROR,
  URL_ERROR,
  MOVIES_ERROR,
  INTERNAL_SERVER_ERROR,
  AUTHORIZATION_ERROR,
  DELETE_MOVIE_ERROR,
  BAD_REQUEST,
  URL_REG_EXP,
};
