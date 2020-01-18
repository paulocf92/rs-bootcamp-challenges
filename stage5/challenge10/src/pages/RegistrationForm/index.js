import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DatePicker from './DatePicker';
import NamePicker from './NamePicker';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import 'react-datepicker/dist/react-datepicker.css';

import * as RegistrationActions from '~/store/modules/registration/actions';

import { MainContainer as Container } from '~/styles/common';
import { Wrapper, Header } from './styles';

const today = format(new Date(), 'yyyy-MM-dd');

const schema = Yup.object().shape({
  student: Yup.string().required('Escolha um aluno'),
  plan: Yup.string().required('Escolha um plano'),
  startDate: Yup.date()
    .min(today, 'A data não pode ser menor do que hoje')
    .required('Data inicial obrigatória'),
});

export default function RegistrationForm({ match, updating }) {
  const dispatch = useDispatch();
  const [registration, setRegistration] = useState();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [price, setPrice] = useState(0);

  // Initial data loading (when updating)
  useEffect(() => {
    async function loadPlans() {
      const checkPlans = await api.get(`plans`);

      if (checkPlans.data) {
        setPlans(checkPlans.data);
      }
    }

    async function loadRegistration() {
      const { id } = match.params;

      const checkRegistration = await api.get(`registrations/${id}`);

      if (checkRegistration.data) {
        setRegistration(checkRegistration.data);
        setSelectedPlan(checkRegistration.data.plan_id);
        setStartingDate(parseISO(checkRegistration.data.start_date));
      }
    }

    loadPlans();

    // If we're updating...
    if (updating) {
      loadRegistration();
    }
  }, [updating, match]);

  // Date and price formatting
  const endingDateFormatted = useMemo(
    () =>
      format(endingDate, 'yyyy-MM-dd', {
        locale: pt,
      }),
    [endingDate],
  );

  const priceFormatted = useMemo(() => formatPrice(price), [price]);

  // DefaultValue for NamePicker
  const defaultStudent = useMemo(
    () =>
      registration && {
        value: registration.student_id,
        label: registration.Student.name,
      },
    [registration],
  );

  // Watch when there's a change to starting date or selected plan
  // Set final price, ending date based on plan, otherwise copy starting date
  useEffect(() => {
    const planData = plans.find(p => p.id === selectedPlan);

    if (planData) {
      setPrice(planData.price * planData.duration);
      setEndingDate(new Date(addMonths(startingDate, planData.duration)));
    } else {
      setEndingDate(startingDate);
    }
  }, [startingDate, selectedPlan, plans]);

  function handleOnChangePlan(e) {
    const selected = e.target.options[e.target.selectedIndex];

    setSelectedPlan(parseInt(selected.value, 10));
  }

  // Callback to get starting date
  function getDate(date) {
    setStartingDate(date);
  }

  function handleSubmit({ startDate, plan, student }) {
    if (updating) {
      const { id } = match.params;
      dispatch(
        RegistrationActions.updateRegistrationRequest(
          id,
          student,
          plan,
          startDate,
          endingDate,
          price,
        ),
      );
    } else {
      dispatch(
        RegistrationActions.addRegistrationRequest(
          student,
          plan,
          startDate,
          endingDate,
          price,
        ),
      );
    }
  }

  return (
    <Container>
      <Header>
        <h2>{updating ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h2>
        <div>
          <Link to="/registrations">VOLTAR</Link>
          <button type="submit" form="registrationForm">
            SALVAR
          </button>
        </div>
      </Header>

      <Wrapper>
        <Form
          initialData={registration}
          schema={schema}
          id="registrationForm"
          onSubmit={handleSubmit}
        >
          <NamePicker
            inputName="student"
            label="ALUNO"
            defaultValue={defaultStudent}
          />
          <div>
            <div>
              <Select
                name="plan"
                value={selectedPlan}
                options={plans}
                label="PLANO"
                placeholder="Selecione o plano"
                onChange={handleOnChangePlan}
              />
            </div>
            <DatePicker
              name="startDate"
              label="DATA DE INÍCIO"
              todayButton="Hoje"
              dateFormat="dd/MM/yyyy"
              defaultValue={startingDate}
              onChangeDate={getDate}
            />
            <div>
              <Input
                name="endDate"
                type="date"
                value={endingDateFormatted}
                disabled
                readOnly
                label="DATA DE TÉRMINO"
              />
            </div>
            <div>
              <Input
                name="price"
                value={priceFormatted}
                disabled
                readOnly
                label="VALOR FINAL"
              />
            </div>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updating: PropTypes.bool,
};

RegistrationForm.defaultProps = {
  updating: false,
};
