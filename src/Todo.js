import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { FormCheck } from "react-bootstrap";
import  { useEffect, useState } from "react";

const Todo = () => {
    const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);
  useEffect (() => {
    console.log('list', list)
  }, [list])

  const updateInput = (value) => {
    setUserInput(value);
    console.log("User Input:", value);
  };

  const addItem = () => {
    if (userInput.trim() !== '') {
      const newItem = { id: Date.now(), value: userInput, completed: false };
      console.log("Adding Item:", newItem);
      setList((prevList) => {
        const updatedList = [...prevList, newItem];
        console.log("Updated List After Add:", updatedList);
        return updatedList;
      });
      setUserInput('');
    }
  };

  const deleteItem = (id) => {
    console.log("Deleting Item with ID:", id);
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      console.log("Updated List After Delete:", updatedList);
      return updatedList;
    });
  };

  const editItem = (index) => {
    const updatedList = [...list];
    const itemToEdit = updatedList[index];
    const newValue = prompt("Enter new value", itemToEdit.value);
    if (newValue !== null && newValue.trim() !== '') {
      updatedList[index] = { ...itemToEdit, value: newValue };
      console.log("Editing Item:", updatedList[index]);
      setList(updatedList);
      console.log("Updated List After Edit:", updatedList);
    }
  };

  const handleCheckChange =(id) => {
    console.log("Checkbox Changed");
    setList((prevList) => {
      if (!prevList) return prevList;
      return prevList.map((item) => {
      if (item.id === id) {
        return {...item, completed: !item.completed}
      }
      return item
      })
      })
    }

  return (
    <div className='todo' >
    <Container className='container' >
        <Row className='row-1' >
          <h1 className='text-center'>
            TODO LIST
          </h1>
          <hr />
        </Row>
        <Row >
          <Col md={{ span: 8, offset: 2 }} sm={{span: 8, offset: 2}} xs={{ span: 10, offset: 1 }}>
            <InputGroup>
              <FormControl
                placeholder="Add items ..."
                size="lg"
                value={userInput}
                onChange={(e) => updateInput(e.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
                style={{
                  border: "1px solid gray",
                  boxShadow: "0 0 10px gray" }}
              />
            </InputGroup>
            <InputGroup>
              <Button
                variant="dark"
                className="mt-2"
                size="lg"
                onClick={addItem}>
                ADD
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={{ span: 8, offset: 2 }} sm={{span: 8, offset: 2}} xs={{ span: 10, offset: 1 }}>
            <ListGroup className="d-flex flex-wrap">
              {list.map((item) => (
                <ListGroup.Item
                  
                  key={item.id}
                  action 
                  className="list-group-items"
                  style={{
                    display: "flex", 
                    background: '#85d482',
                    justifyContent: "space-between", 
                    textDecoration: item.completed ? 'line-through': 'initial',
                    color: item.completed ? 'gray' : 'initial',
                  }}>
                  <div className='item'>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckChange(item.id)}
                    style={{ accentColor: item.completed ? '#808080  ' : '#fff' }}
                  />
                    {item.value}
                  </div>
                  <div className="buttons">
                    <Button
                      variant="light"
                      style={{ marginRight: "10px" }}
                      onClick={() => deleteItem(item.id)}>
                      Delete
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => editItem(list.indexOf(item))}>
                      Edit
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Todo