import React, { useEffect, useState } from 'react';
import todo from './todo.png';
import './Todo.css';

const getLocalStorageData = () => {
  const list = localStorage.getItem('todo');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Todo = () => {
  const [data, setData] = useState('');
  const [item, setItem] = useState(getLocalStorageData());
  const [edited, setEdited] = useState('');
  const [toggle, setToggle] = useState(false);

  const addItem = () => {
    if (!data) {
      alert('Please add todo activity');
    } else if (data && toggle) {
      setItem(
        item.map(ele => {
          if (ele.id === edited) {
            return { ...ele, name: data };
          }
          return ele;
        })
      );
      setData('');
      setEdited('');
      setToggle(false);
    } else {
      const myInputData = {
        id: new Date().getSeconds(),
        name: data,
      };

      setItem([...item, myInputData]);
      setData('');
    }
  };

  const deleteItem = index => {
    const updatedItem = item.filter(cur => {
      return cur.id !== index;
    });
    setItem(updatedItem);
  };
  const removeAll = () => {
    setItem([]);
  };
  const edit = index => {
    const update = item.find(cur => {
      return cur.id === index;
    });
    setData(update.name);
    setEdited(index);
    setToggle(true);
  };

  //add to localstorage
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(item));
  }, [item]);

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todo} alt="todoimg" />

          <figcaption>Add Your List Here✌</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder=" 👉 Add items"
            className="form-control"
            value={data}
            onChange={e => setData(e.target.value)}
          />

          {toggle ? (
            <i className="far fa-edit plus" onClick={addItem} />
          ) : (
            <i className="fas fa-plus plus" onClick={addItem} />
          )}
        </div>
        {item.map(cur => (
          <div className="showItem" key={cur.id}>
            <h3>{cur.name}</h3>
            <div className="icon">
              <i className="far fa-edit plus" onClick={() => edit(cur.id)} />
              <i
                className="far fa-trash-alt plus trash"
                onClick={() => deleteItem(cur.id)}
              />
            </div>
          </div>
        ))}

        <div className="showItems">
          <button className="btn" onClick={removeAll}>
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
