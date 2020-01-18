import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

export default function DatePicker({
  name,
  dateFormat,
  label,
  todayButton,
  defaultValue,
  onChangeDate,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  function onChangeHandler(date) {
    setSelected(date);
    onChangeDate(date);
  }

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatePicker
        id={fieldName}
        name={fieldName}
        todayButton={todayButton}
        selected={selected}
        dateFormat={dateFormat}
        onChange={onChangeHandler}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  label: PropTypes.string,
  todayButton: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  onChangeDate: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  label: '',
  todayButton: '',
  defaultValue: new Date(),
};
