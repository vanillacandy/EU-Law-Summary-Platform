import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {useCSRFToken} from "./CSRFTokenContext";
import {roles, UserRoleStringToIntMapping} from "./enums";

const DeleteUserModalComponent = ({show, onHide, user, setCurrentUser}) => {
    const {csrfToken} = useCSRFToken();
    const [selectedRole, setSelectedRole] = useState(user.role || roles[0]);

    async function deleteUser() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/userDelete/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: user.id,
                })
            });

            setCurrentUser(null)
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteUser = async () => {
        await deleteUser();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete {user.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {user.username}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUserModalComponent;