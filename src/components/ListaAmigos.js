import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Accordion, Badge } from 'react-bootstrap';
import PresenteCard from './PresenteCard';
import PresenteForm from './PresenteForm';
import { getPresentes, deletePresente } from '../services/presentesService';
import { AMIGOS } from '../data/amigos';

const ListaAmigos = () => {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [presenteEditando, setPresenteEditando] = useState(null);
  const [amigoFiltro, setAmigoFiltro] = useState(null);
  const [activeKey, setActiveKey] = useState('0');

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

  const handleAdd = (amigo = null) => {
    setPresenteEditando(null);
    setAmigoFiltro(amigo);
    setShowForm(true);
  };

  const handleEdit = (presente) => {
    setPresenteEditando(presente);
    setAmigoFiltro(null);
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

  const handleFormSuccess = (amigoNome) => {
    loadPresentes();
    
    // Expandir o accordion do amigo após salvar
    if (amigoNome) {
      const amigoIndex = AMIGOS.findIndex(amigo => amigo === amigoNome);
      if (amigoIndex !== -1) {
        setActiveKey(amigoIndex.toString());
        
        // Scroll suave até o accordion do amigo
        setTimeout(() => {
          const accordionItem = document.querySelector(`[data-amigo-index="${amigoIndex}"]`);
          if (accordionItem) {
            accordionItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    }
  };

  const getPresentesPorAmigo = (amigo) => {
    return presentes.filter(p => p.amigo === amigo);
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
    <Container className="mt-3 mt-md-4 px-3 px-md-4">
      <Row className="mb-3 mb-md-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <h1 className="h4 h-md-3 mb-0">Lista de Presentes - Amigo Secreto</h1>
            <Button variant="primary" onClick={() => handleAdd()} className="w-100 w-md-auto">
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
        <Col>
          <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k || '0')} className="mb-4">
            {AMIGOS.map((amigo, index) => {
              const presentesDoAmigo = getPresentesPorAmigo(amigo);
              return (
                <Accordion.Item 
                  eventKey={index.toString()} 
                  key={amigo}
                  data-amigo-index={index}
                >
                  <Accordion.Header>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 me-2 me-md-3 gap-1 gap-md-0">
                      <span className="text-break">
                        <strong>{index + 1}. {amigo}</strong>
                      </span>
                      <Badge bg={presentesDoAmigo.length > 0 ? 'success' : 'secondary'} className="flex-shrink-0">
                        {presentesDoAmigo.length} {presentesDoAmigo.length === 1 ? 'presente' : 'presentes'}
                      </Badge>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="px-2 px-md-3">
                    <div className="mb-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleAdd(amigo)}
                        className="w-100 w-md-auto"
                      >
                        ➕ Adicionar Presente para {amigo}
                      </Button>
                    </div>
                    {presentesDoAmigo.length === 0 ? (
                      <Alert variant="light">
                        Nenhum presente cadastrado para {amigo} ainda.
                      </Alert>
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {presentesDoAmigo.map((presente) => (
                          <div key={presente.id} style={{ width: '100%' }}>
                            <PresenteCard
                              presente={presente}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
      </Row>

      <PresenteForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setPresenteEditando(null);
          setAmigoFiltro(null);
        }}
        presente={presenteEditando}
        amigoPreSelecionado={amigoFiltro}
        onSuccess={(amigoNome) => {
          const amigoParaExpandir = amigoNome || presenteEditando?.amigo || amigoFiltro;
          handleFormSuccess(amigoParaExpandir);
        }}
      />
    </Container>
  );
};

export default ListaAmigos;

