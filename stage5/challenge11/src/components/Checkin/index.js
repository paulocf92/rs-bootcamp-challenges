import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, CheckinId, CheckinTime } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <CheckinId>Check-in #{data.id}</CheckinId>
      <CheckinTime>{dateParsed}</CheckinTime>
    </Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
};
