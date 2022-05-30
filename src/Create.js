import React, { useEffect } from 'react'
import { Form, Label, FormGroup, Input, Button } from 'reactstrap'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Create(props) {
    const { id } = useParams();

    const [formData, setformData] = useState({
        username: '',
        email: '',
        age: ''
    });

    const { username, email, age } = formData;

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.name, e.target.value);
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (id) {
            fetch('https://625b049050128c570200c123.mockapi.io/users/' + id)
                .then(response => response.json())
                .then(data => setformData(data));
            // console.log(formData);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            fetch('https://625b049050128c570200c123.mockapi.io/users/' + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Data Updated Successfully');
                    props.history.push("/");
                })
                .catch(err => console.log(err));
        } else {
            fetch('https://625b049050128c570200c123.mockapi.io/users/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Data Saved Successfully');
                    props.history.push("/");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div>
            <Form inline className='container'>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="username">
                        username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        type="text"
                        value={username}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="email">
                        email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="age">
                        age
                    </Label>
                    <Input
                        id="age"
                        name="age"
                        placeholder="Enter age"
                        type="number"
                        value={age}
                        onChange={handleChange}
                    />
                    <Button onClick={handleSubmit} >
                        Submit
                    </Button>
                    <Button onClick={() => props.history.push("/")} color="danger">
                        Cancel
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}
