import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
        // Add more users as needed
    ]);

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
    };

    const handleShow = (user = null) => {
        setSelectedUser(user);
        setUsername(user ? user.username : '');
        setEmail(user ? user.email : '');
        setPassword(user ? user.password : '');
        setShow(true);
    };

    const handleSave = () => {
        if (selectedUser) {
            setUsers(users.map(user => 
                user.id === selectedUser.id 
                    ? { ...user, username: username, email: email, password: password }
                    : user
            ));
        } else {
            const newUser = {
                id: users.length + 1,
                username: username,
                email: email,
                password: password
            };
            setUsers([...users, newUser]);
        }
        handleClose();
    };

    return (
        <div className="container-xl p-5">
            <h1>User Management</h1>
            <Button variant="success" onClick={() => handleShow()}>Add User</Button>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
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
                            <td>
                                <Button variant="primary" onClick={() => handleShow(user)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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