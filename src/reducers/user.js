// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action.email);
  switch (action.type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: action.email,
    };
  default: return state;
  }
};

export default user;
