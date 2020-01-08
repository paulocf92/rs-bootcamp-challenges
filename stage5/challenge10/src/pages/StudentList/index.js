import React, { useEffect, useState } from 'react';
import api from '~/services/api';

import { Container, StudentTable, ListHeader } from './styles';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchedStudents, setSearchedStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
      setSearchedStudents(response.data);
    }

    loadStudents();
  }, [setStudents, setSearchedStudents]);

  function handleOnChange(e) {
    const searched = students.filter(student =>
      student.name.toUpperCase().startsWith(e.target.value.toUpperCase()),
    );
    setSearchedStudents(searched);
  }

  return (
    <Container>
      <ListHeader>
        <h2>Gerenciando alunos</h2>
        <div>
          <button type="button">CADASTRAR</button>
          <input
            type="text"
            name="student"
            id="student"
            placeholder="Buscar aluno"
            onChange={handleOnChange}
          />
        </div>
      </ListHeader>

      <div>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {searchedStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button type="button">editar</button>
                  <button type="button">apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </div>
    </Container>
  );
}
