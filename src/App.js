import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';



function App(props) {
  let url = 'https://625b049050128c570200c123.mockapi.io/users/';

  const [data, setData] = useState([])

  const getData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleDel = (id) => {
    fetch(url + id, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {
        getData();
        alert("Deleted");
      });
  }

  return (
    <div>
      <Table hover className='container'>
        <thead>
          <tr>
            <th>
              S.NO
            </th>
            <th>
              username
            </th>
            <th>
              email
            </th>
            <th>
             age
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr>
              <th scope='row'>
                {index + 1}
              </th>
              <th>
                {value.username}
              </th>
              <th>
                {value.email}
              </th>
              <th>
                {value.age}
              </th>
              <th>
                <Button color='danger' onClick={() => handleDel(value.id)}>Delete</Button>
                <Button color='success' onClick={() => props.history.push(`/create/${value.id}`)}>Edit</Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button color='primary' className="me-md-2 " onClick={() => props.history.push("/create")}>Create User</Button>
      </div>
    </div>
  );
}

export default App;
