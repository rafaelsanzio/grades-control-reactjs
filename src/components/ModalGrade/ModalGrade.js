import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import * as api from '../../api/apiService';

import css from './modalgrade.module.css';

Modal.setAppElement('#root');

function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;

  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };

    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue}`,
      );
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const formData = {
      id,
      newValue: gradeValue,
    };

    onSave(formData);
  };

  const handleGradeChange = event => {
    setGradeValue(+event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div className={css.flexRow}>
          <span className={css.title}>Manutenção de Notas</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" readOnly value={student} />
            <label className="active" htmlFor="inputName">
              Nome do Aluno:
            </label>
          </div>

          <div className="input-field">
            <input id="inputSubjext" type="text" readOnly value={subject} />
            <label className="active" htmlFor="inputSubjext">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" readOnly value={type} />
            <label className="active" htmlFor="inputType">
              Avaliação
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota:
            </label>
          </div>

          <div className={css.flexRow}>
            <button
              className="waves-effect waves-lights btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span className={css.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalGrade;
