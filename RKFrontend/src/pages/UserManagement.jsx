import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [station, setStation] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://rk-energies-u9cj.onrender.com/backendapi/users/');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
    };

    const handleShow = (user = null) => {
        setSelectedUser(user);
        setUsername(user ? user.username : '');
        setEmail(user ? user.email : '');
        setPassword(user ? user.password : '');
        setStation(user ? user.station : '');
        setShow(true);
    };

    const handleSave = async () => {
        const userData = {
            username,
            email,
            password,
            station,
        };

        try {
            const response = await fetch(`https://rk-energies-u9cj.onrender.com/backendapi/users/${selectedUser ? selectedUser.id : ''}`, {
                method: selectedUser ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                fetchUsers();
                handleClose();
            } else {
                console.error('Error saving user');
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="container-xl p-5">
            <h1>User Management</h1>
            <Button variant="success" onClick={() => handleShow()}>Add User</Button>
            {users.length === 0 ? (
                <p>No users available</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Station</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.station}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleShow(user)}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formStation" className="mt-3">
                            <Form.Label>Station</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={station} 
                                onChange={(e) => setStation(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagement;