import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

class Home extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    };
  }
  componentDidMount() {
    M.AutoInit();
    //GET message from server using fetch api
    fetch('api/users/current')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }
  render() {
    {
      /* Dummy products*/
    }
    const products = [
      {
        name: 'Item 1',
        price: '$10',
        qty: '5',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Bags/BagPhotography1.jpg?quality=92'
      },
      {
        name: 'Item2',
        price: '$100',
        qty: '1',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Baby/BabyProductPhoto_1.jpg?quality=92'
      },
      {
        name: 'Item 3',
        price: '$50',
        qty: '10',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/BathBody/BathBodyProductPhoto_1.jpg?quality=92'
      },
      {
        name: 'Item 4',
        price: '$40',
        qty: '3',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Bridal/BridalProductPhotography_1.jpg?quality=92'
      },
      {
        name: 'Item 5',
        price: '$11',
        qty: '5',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Clothing/ClothingPhotography_2.jpg?quality=92'
      },
      {
        name: 'Item 6',
        price: '$1',
        qty: '5',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Computers/ComputerPhotography_1.jpg?quality=92'
      },
      {
        name: 'Item 7',
        price: '$105',
        qty: '5',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Cosmetics/CosmeticPhotography_1.jpg?quality=92'
      },
      {
        name: 'Item 8',
        price: '$100',
        qty: '20',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Displays/DisplayPhotography_1.jpg?quality=92'
      },
      {
        name: 'Item 9',
        price: '$10',
        qty: '11',
        img:
          'https://productphoto-cdn.sirv.com/Portfolio/Electronics/ElectronicPhotography_4.jpg?quality=92'
      }
    ];

    let cards = [];

    products.forEach(function(product, index) {
      cards.push(
        <div key={index} className="col s6 m4">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={product.img} />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {product.name}
                <i className="material-icons right teal-text">more_vert</i>
              </span>
              <div className="card-action ">
                <a className="left grey-text text-darken-4" href="#">
                  Qty: {product.qty}
                </a>
                <a className="right price-text" href="#">
                  {product.price}
                </a>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                Card Title<i className="material-icons right">close</i>
              </span>
              <p>
                Here is some more information about this product that is only
                revealed once clicked on.
              </p>
            </div>
          </div>
        </div>
      );
    });
    console.log(cards);

    return (
      <div>
        <h2>Shop</h2>
        <div className="row">{cards}</div>
        <div className="row">
          <div className="center">
            {' '}
            <ul className="pagination">
              <li className="disabled">
                <a href="#!">
                  <i className="material-icons">chevron_left</i>
                </a>
              </li>
              <li className="active">
                <a href="#!">1</a>
              </li>
              <li className="waves-effect">
                <a href="#!">2</a>
              </li>
              <li className="waves-effect">
                <a href="#!">3</a>
              </li>
              <li className="waves-effect">
                <a href="#!">4</a>
              </li>
              <li className="waves-effect">
                <a href="#!">5</a>
              </li>
              <li className="waves-effect">
                <a href="#!">
                  <i className="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
