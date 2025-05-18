import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <Container className="py-4">
      <h3>Liste des utilisateurs</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(user)}
                  >
                    Éditer
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
