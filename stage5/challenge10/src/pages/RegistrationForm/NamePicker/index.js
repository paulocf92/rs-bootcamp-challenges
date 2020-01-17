import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

export default function NamePicker({ inputName, label, defaultValue }) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [inputStudent, setInputStudent] = useState();

  async function options(inputValue) {
    const response = await api.get(`students?name=${inputValue}`);

    const students = response.data.map(student => ({
      value: student.id,
      label: student.name,
    }));

    return students;
  }

  /**
   * Updates current student as soon as defaultValue changes. It ensures we got
   * a valid student with a passed defaultValue obtained asynchronously in case
   * we're updating.
   */
  useEffect(() => {
    if (defaultValue) {
      setSelectedStudent(defaultValue.value);
      setInputStudent(defaultValue);
    }
  }, [defaultValue]);

  // Whenever react-select updates student, reflect it on the hidden input
  // which is captured by unform and update state
  function onChangeHandler(student) {
    setInputStudent(student);
    setSelectedStudent(parseInt(student.value, 10));
  }

  return (
    <Container>
      <label htmlFor={inputName}>{label}</label>
      <AsyncSelect
        loadOptions={options}
        isLoading
        autoFocus
        cacheOptions
        value={inputStudent}
        onChange={onChangeHandler}
        // onBlur={onBlurHandler}
        placeholder="Selecione o aluno"
        className="react-select-container"
        classNamePrefix="react-select"
      />
      <Input
        type="text"
        name={inputName}
        value={selectedStudent}
        disabled
        readOnly
      />
    </Container>
  );
}

NamePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

NamePicker.defaultProps = {
  label: '',
  defaultValue: undefined,
};
