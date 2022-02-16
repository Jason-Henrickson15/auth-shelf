import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {

  const shelf = useSelector(store => store.shelf);
  console.log('this is the shelf reducer', shelf);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_SHELF' })
  }, []);


  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        {shelf.map(item => {
          return (
            <li key={item.id}>{item.description}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
