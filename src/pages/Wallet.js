import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, removeExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = { despesa: {
      id: 0, // dps coloca ths.state.id + 1
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
    moedas: [],
    loading: false };
  }

  componentDidMount() {
    this.fetchMoedas();
  }

  fetchMoedas = async () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => Object.keys(data)
      .filter((item) => item !== 'USDT' && item !== 'DOGE'))
    .then((list) => this.setState({ moedas: list, loading: true }))

  handleChange = (event) => {
    const aux1 = event.target.value;
    const { despesa } = this.state;
    switch (event.target.name) {
    case 'valor':
      this.setState({ despesa: { ...despesa, value: aux1 } });
      break;
    case 'descricao':
      this.setState({ despesa: { ...despesa, description: aux1 } });
      break;
    case 'moeda':
      this.setState({ despesa: { ...despesa, currency: aux1 } });
      break;
    case 'metodo':
      this.setState({ despesa: { ...despesa, method: aux1 } });
      break;
    case 'categoria':
      this.setState({ despesa: { ...despesa, tag: aux1 } });
      break;
    default:
      console.log('a');
    }
  }

  handleClickAdd = (event) => {
    const { submit } = this.props;
    const { despesa } = this.state;
    submit(despesa);
    const inpValue = event.target.parentNode.firstChild.lastChild;
    inpValue.value = '';
    this.setState({ despesa: { ...despesa, value: 0, id: despesa.id + 1 } });
  }

  handleDelete = (id) => {
    const { deleteExp, expenses } = this.props;
    const expense = expenses.find((item) => item.id === id);
    deleteExp(expense);
  }

  render() {
    const { emailUser, expenses } = this.props;
    const { loading, moedas } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ emailUser }</p>
          <p data-testid="total-field">
            {(expenses.length > 0 ? expenses.reduce((acc, item) => {
              const arrMoedas = Object.values(item.exchangeRates);
              const valorMoeda = arrMoedas.find((moeda) => moeda.code === item.currency);
              const custo = item.value * parseFloat(valorMoeda.ask);
              return acc + custo;
            }, 0).toFixed(2) : 0)}

          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="value-input">
            Valor da despesa
            <input
              type="text"
              data-testid="value-input"
              id="value-input"
              name="valor"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              name="descricao"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="moeda"
              onChange={ this.handleChange }
            >
              {loading
              && moedas.map((item) => (
                <option
                  key={ item }
                  data-testid={ item }
                >
                  {item}
                </option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method-input"
              name="metodo"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              data-testid="tag-input"
              id="tag-input"
              name="categoria"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClickAdd }>Adicionar despesa</button>
        </section>
        <section>
          <table border="1px">
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Tag</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.length > 0 && (
              <tr>
                {expenses.map((despesa) => {
                  const arrMoedas = Object.values(despesa.exchangeRates);
                  const valorMoeda = arrMoedas
                    .find((moeda) => moeda.code === despesa.currency);
                  const cambioUt = parseFloat(valorMoeda.ask);
                  const valorConv = cambioUt * despesa.value;
                  const nameMoeda = valorMoeda.name.split('/')[0];
                  const valorDespesa = parseFloat(despesa.value);
                  return (
                    <>
                      <td>{valorDespesa.toFixed(2)}</td>
                      <td>{despesa.description}</td>
                      <td>{nameMoeda}</td>
                      <td>{despesa.method}</td>
                      <td>{despesa.tag}</td>
                      <td>{cambioUt.toFixed(2)}</td>
                      <td>{valorConv.toFixed(2)}</td>
                      <td>Real</td>
                      <td>
                        <button type="button">Editar</button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ () => this.handleDelete(despesa.id) }
                        >
                          Excluir
                        </button>
                      </td>
                    </>);
                })}
              </tr>)}
          </table>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (obj) => dispatch(addExpense(obj)),
  deleteExp: (despesa) => dispatch(removeExpense(despesa)),
});

Wallet.propTypes = {
  emailUser: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
