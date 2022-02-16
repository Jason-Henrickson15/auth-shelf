import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {
  const [itemDescription, setItemDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const shelf = useSelector(store => store.shelf);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_SHELF' });
  }, []);

  function removeItem(id) {
    console.log('in remove item', id)
  }
  function sendItems() {
    console.log('the submit button was clicked');
    console.log('this is the desc', itemDescription);
    console.log('this is the image url', imageUrl);
    dispatch ({
      type: 'ADD_ITEM',
      payload: {description: itemDescription, image_url: imageUrl}
    });
  }


  return (
    <div className="container">
      <div>
        <h2>Add Item:</h2>
        <input placeholder='Item Desc' value={itemDescription} onChange={(event) => setItemDescription(event.target.value)}/>
        <input placeholder='Image URL' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
        <button onClick={sendItems}>Submit</button>
      </div>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        {shelf.map(item => {
          return (
            <li key={item.id}> <button id={item.id} onClick={(event) => removeItem(event.target.id)} >Delete</button> {item.description} <img src={item.image_url}/></li>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
