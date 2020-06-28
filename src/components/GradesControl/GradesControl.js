import React from 'react';

import Action from '../Action/Action';

import css from './gradescontrol.module.css';

function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach(grade => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  //Adding the last element
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  const handleActionClick = (id, type) => {
    const grade = grades.find(grade => grade.id === id);

    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  };

  return (
    <div className="container center">
      {tableGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce(
          (accumulator, current) => accumulator + current.value,
          0,
        );

        const gradeStyle =
          finalGrade >= 70
            ? { style: css.goodGrade, label: 'APROVADO' }
            : { style: css.badGrade, label: 'REPROVADO' };

        const tableStyle = `striped center ${css.table}`;

        return (
          <table key={id} className={tableStyle}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            id={id}
                            type={isDeleted ? 'add' : 'edit'}
                            onActionClick={handleActionClick}
                          />
                          {!isDeleted && (
                            <Action
                              id={id}
                              type="delete"
                              onActionClick={handleActionClick}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'center' }}>
                  <strong>Total</strong>
                </td>
                <td>
                  <span className={gradeStyle.style}>{finalGrade}</span>
                </td>
                <td>
                  <span className={gradeStyle.style}>{gradeStyle.label}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}

export default GradesControl;
