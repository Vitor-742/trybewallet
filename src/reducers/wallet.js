// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const aux = [...state.expenses, action.expense];
  const aux2 = state.expenses.filter((expense) => expense !== action.expense);
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: aux,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: aux2,
    };
  default:
    return state;
  }
};

export default wallet;
