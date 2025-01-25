import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FuelManagement = () => {
    const [fuelStations, setFuelStations] = useState([
        { id: 1, place: 'Station A', petrolPrice: 3.50, dieselPrice: 3.20 },
        { id: 2, place: 'Station B', petrolPrice: 3.60, dieselPrice: 3.30 },
        // Add more stations as needed
    ]);

    const [show, setShow] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [place, setPlace] = useState('');
    const [petrolPrice, setPetrolPrice] = useState('');
    const [dieselPrice, setDieselPrice] = useState('');

    const handleClose = () => {
        setShow(false);
        setSelectedStation(null);
    };

    const handleShow = (station = null) => {
        setSelectedStation(station);
        setPlace(station ? station.place : '');
        setPetrolPrice(station ? station.petrolPrice : '');
        setDieselPrice(station ? station.dieselPrice : '');
        setShow(true);
    };

    const handleSave = () => {
        if (selectedStation) {
            setFuelStations(fuelStations.map(station => 
                station.id === selectedStation.id 
                    ? { ...station, place: place, petrolPrice: petrolPrice, dieselPrice: dieselPrice }
                    : station
            ));
        } else {
            const newStation = {
                id: fuelStations.length + 1,
                place: place,
                petrolPrice: petrolPrice,
                dieselPrice: dieselPrice
            };
            setFuelStations([...fuelStations, newStation]);
        }
        handleClose();
    };

    return (
        <div className="container-xl p-5">
            <h1>Fuel Management</h1>
            <Button variant="success" onClick={() => handleShow()}>Add Station</Button>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Place</th>
                        <th>Petrol Price</th>
                        <th>Diesel Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fuelStations.map(station => (
                        <tr key={station.id}>
                            <td>{station.id}</td>
                            <td>{station.place}</td>
                            <td>${station.petrolPrice.toFixed(2)}</td>
                            <td>${station.dieselPrice.toFixed(2)}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShow(station)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStation ? 'Edit Station' : 'Add Station'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlace">
                            <Form.Label>Place</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={place} 
                                onChange={(e) => setPlace(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPetrolPrice" className="mt-3">
                            <Form.Label>Petrol Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={petrolPrice} 
                                onChange={(e) => setPetrolPrice(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formDieselPrice" className="mt-3">
                            <Form.Label>Diesel Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={dieselPrice} 
                                onChange={(e) => setDieselPrice(e.target.value)} 
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

export default FuelManagement;