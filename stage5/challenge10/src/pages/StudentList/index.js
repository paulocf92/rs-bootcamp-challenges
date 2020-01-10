import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { MainContainer as Container } from '~/styles/common';
import { Wrapper, Header } from './styles';

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

  function test() {
    const resp = window.confirm('Excluir aluno?'); // eslint-disable-line
    // alert(resp);
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando alunos</h2>
        <div>
          <Link to="/students/register">CADASTRAR</Link>
          <input
            type="text"
            name="student"
            id="student"
            placeholder="Buscar aluno"
            onChange={handleOnChange}
          />
        </div>
      </Header>

      <Wrapper>
        <table>
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
                  <Link to={`/students/edit/${student.id}`}>editar</Link>
                  <button type="button" onClick={test}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
    </Container>
  );
}
