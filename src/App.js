

const App = () => {

  const categoroes = [
    {
      title: 'Hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'Jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'Sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      id: 3,
      linkUrl: 'shop/sneakers'
    },
    {
      title: 'Womans',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womans'
    },
    {
      title: 'Mens',
      imageUrl: 'https://i.ibb.co/R//Mens.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
  ]

  return (
    <div className="categoroes-containmer">
      {categoroes.map(({title, imageUrl, id, size}) => (
      <div className="category-container">
        {/*img*/}
        <div classname="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
      ))}
    </div>
  );
}

export default App;
