import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import PresenteCard from './PresenteCard';
import PresenteForm from './PresenteForm';
import { getPresentes, deletePresente } from '../services/presentesService';

const ListaPresentes = () => {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [presenteEditando, setPresenteEditando] = useState(null);

  useEffect(() => {
    loadPresentes();
  }, []);

  const loadPresentes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPresentes();
      setPresentes(data);
    } catch (err) {
      setError('Erro ao carregar presentes. Verifique sua conexão com o Firebase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setPresenteEditando(null);
    setShowForm(true);
  };

  const handleEdit = (presente) => {
    setPresenteEditando(presente);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePresente(id);
      await loadPresentes();
    } catch (err) {
      alert('Erro ao excluir presente. Tente novamente.');
      console.error(err);
    }
  };

  const handleFormSuccess = () => {
    loadPresentes();
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Lista de Presentes - Amigo Secreto</h1>
            <Button variant="primary" onClick={handleAdd}>
              ➕ Adicionar Presente
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {presentes.length === 0 && !loading && (
        <Row>
          <Col>
            <Alert variant="info">
              Nenhum presente cadastrado ainda. Clique em "Adicionar Presente" para começar!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {presentes.map((presente) => (
          <Col key={presente.id} md={6} lg={4}>
            <PresenteCard
              presente={presente}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>

      <PresenteForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setPresenteEditando(null);
        }}
        presente={presenteEditando}
        onSuccess={handleFormSuccess}
      />
    </Container>
  );
};

export default ListaPresentes;

