const ADD_EMAIL = 'ADD_EMAIL';
const ADD_EXPENSE = 'ADD_EXPENSE';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });

export const addExpense2 = (obj) => ({ type: ADD_EXPENSE, expense: obj });

export const addExpense = (obj) => async (dispatch) => {
  const exchangeRates = fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  obj.exchangeRates = await exchangeRates;
  dispatch(addExpense2(obj));
};
