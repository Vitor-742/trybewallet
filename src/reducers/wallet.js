// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const aux = [...state.expenses, action.expense];
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: aux,
    };
  default:
    return state;
  }
};

export default wallet;
