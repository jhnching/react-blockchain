import React, { Component } from 'react';
import { connect } from 'react-redux';

import { crypto, active } from './store/todo/crypto.selectors';
import { loadCrypto, deleteCrypto, addCrypto, sort } from './store/todo/crypto.actions';
import { AppState } from './store/root.reducer';
import { Crypto } from './store/todo/types/crypto.type';

type Props = {
  loadCrypto: Function,
  deleteCrypto: Function,
  addCrypto: Function,
  sort: Function,
  crypto: Crypto[],
  active: Crypto[],
}

type State = {
  selected: number | null
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: null
    }
  }
  
  componentDidMount() {
    this.props.loadCrypto();
  }

  changeSelected = (event: any) => {
    this.setState({ selected: event.target.value })
  }

  addCrypto = () => {
    if (this.props.active.length < 10 && this.state.selected) {
      this.props.addCrypto(this.state.selected);
      this.setState({ selected: null })
    }
  }

  render() {
    const { crypto, active, deleteCrypto, sort } = this.props;

    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>delete</th>
              <th onClick={() => sort('cmc_rank')}>CMC Rank</th>
              <th>symbol</th>
              <th onClick={() => sort('price')}>price</th>
            </tr>
          </thead>
          <tbody>
            {
              active.map(current => (
                <tr key={current.id}>
                  <td><button onClick={() => (active.length > 1) && deleteCrypto(current.id)}>delete</button></td>
                  <td>{current.cmc_rank}</td>
                  <td>{current.symbol}</td>
                  <td>{current.price}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <select onChange={this.changeSelected}>
            <option key='null'>Select an option</option>
          {
            crypto.map(crypto => (<option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>))
          }
        </select>
        <button onClick={this.addCrypto}>Add Crypto</button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  crypto: crypto(state),
  active: active(state)
});

const mapDispatchToProps = {
  loadCrypto,
  deleteCrypto,
  addCrypto, 
  sort
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
