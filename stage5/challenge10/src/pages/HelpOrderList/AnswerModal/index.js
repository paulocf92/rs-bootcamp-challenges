import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as HelpOrderActions from '~/store/modules/helpOrder/actions';

import { StyledModal } from './styles';

export default function AnswerModal({ showModal, helpOrder, onModalClose }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  function closeModal(answered = false) {
    setOpen(false);
    setError(false);
    setAnswer('');
    onModalClose(answered);
  }

  function handleSubmit() {
    if (!answer) {
      setError(true);
    } else {
      dispatch(
        HelpOrderActions.updateHelpOrderAnswerRequest(helpOrder.id, answer),
      );
      closeModal(true);
    }
  }

  return (
    <StyledModal
      isOpen={open}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.6)',
        },
      }}
    >
      <div>
        <h2>PERGUNTA DO ALUNO</h2>
        <p>{helpOrder.question}</p>
        <h2>SUA RESPOSTA</h2>
        <textarea
          name="answer"
          cols="30"
          rows="6"
          placeholder="Digite sua resposta"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Responder aluno
        </button>
        {error && <span>Digite sua resposta</span>}
      </div>
    </StyledModal>
  );
}

AnswerModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  helpOrder: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};
