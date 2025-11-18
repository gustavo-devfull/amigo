import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';

const PresenteCard = ({ presente, onEdit, onDelete }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setLightboxImage(imageSrc);
    setShowLightbox(true);
  };

  const getImageSrc = () => {
    // Apenas tipos com imagem devem exibir foto
    if (presente.tipo === 'upload' && presente.imagemStorage) {
      return presente.imagemStorage;
    }
    if (presente.tipo === 'imagem-url' && presente.imagemUrl) {
      return presente.imagemUrl;
    }
    return null;
  };

  const imageSrc = getImageSrc();
  const temImagem = imageSrc !== null;

  return (
    <>
      <Card className="mb-0" style={{ width: '100%' }}>
        <Card.Body className="d-flex flex-column flex-md-row align-items-start align-items-md-center p-2 p-md-3" style={{ gap: '15px' }}>
          {/* FOTO - apenas se houver imagem */}
          {temImagem && (
            <div style={{ 
              flexShrink: 0, 
              width: '100%', 
              maxWidth: '150px',
              height: '150px',
              margin: '0 auto'
            }} className="mb-2 mb-md-0">
              <img 
                src={imageSrc}
                alt={presente.nome || 'Presente'}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
                onClick={() => handleImageClick(imageSrc)}
                onError={(e) => {
                  console.error('Erro ao carregar imagem. URL:', imageSrc);
                  e.target.style.display = 'none';
                  const errorDiv = document.createElement('div');
                  errorDiv.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border: 1px dashed #dee2e6; color: #6c757d; padding: 10px; text-align: center; border-radius: 4px;';
                  errorDiv.innerHTML = `<small>Erro ao carregar imagem</small>`;
                  e.target.parentNode.appendChild(errorDiv);
                }}
                onLoad={() => {
                  console.log('Imagem carregada com sucesso:', imageSrc);
                }}
              />
            </div>
          )}

          {/* Conteúdo principal */}
          <div className="d-flex flex-column flex-md-row flex-grow-1 align-items-start align-items-md-center" style={{ gap: '10px', width: '100%', minWidth: 0 }}>
            {/* Nome */}
            {presente.nome && (
              <div style={{ 
                flex: '0 0 auto', 
                width: '100%',
                minWidth: '150px'
              }} className="w-100 w-md-auto">
                <Card.Title className="mb-0 mb-md-0" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {presente.nome}
                </Card.Title>
              </div>
            )}

            {/* Descrição */}
            <div style={{ 
              flex: 1, 
              minWidth: 0,
              width: '100%'
            }} className="w-100">
              {presente.tipo === 'link' && presente.link ? (
                // Tipo Link: exibir apenas a descrição como link
                <Card.Text className="mb-0">
                  <a 
                    href={presente.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ fontSize: '0.9rem', textDecoration: 'none', wordBreak: 'break-word' }}
                  >
                    {presente.descricao || 'Ver Presente'}
                  </a>
                </Card.Text>
              ) : presente.descricao ? (
                // Outros tipos: exibir descrição normal
                <Card.Text className="mb-0" style={{ fontSize: '0.9rem', wordBreak: 'break-word' }}>
                  {presente.descricao}
                </Card.Text>
              ) : (
                <Card.Text className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                  Sem descrição
                </Card.Text>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex gap-2 w-100 w-md-auto justify-content-end justify-content-md-start" style={{ flexShrink: 0 }}>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => onEdit(presente)}
              className="flex-fill flex-md-grow-0"
            >
              ✏️ Editar
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja excluir este presente?')) {
                  onDelete(presente.id);
                }
              }}
              className="flex-fill flex-md-grow-0"
            >
              🗑️ Excluir
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Lightbox Modal */}
      <Modal 
        show={showLightbox} 
        onHide={() => setShowLightbox(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{presente.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          {lightboxImage && (
            <img 
              src={lightboxImage} 
              alt={presente.nome}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PresenteCard;

