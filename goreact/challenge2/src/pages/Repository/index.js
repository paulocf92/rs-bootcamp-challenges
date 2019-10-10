import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    filters: [
      { state: 'all', label: 'Todas' },
      { state: 'open', label: 'Abertas' },
      { state: 'closed', label: 'Fechadas' },
    ],
    stateFilter: 1,
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    await this.setState({ stateFilter: 1 });

    const repoName = decodeURIComponent(match.params.repository);

    // pulls both repo data and its issues simultaneously
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { repository, stateFilter, filters } = this.state;

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: filters[stateFilter].state,
        per_page: 5,
      },
    });

    this.setState({ issues: issues.data });
  };

  handleButtonClick = async stateFilter => {
    await this.setState({ stateFilter });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, stateFilter, filters } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilter state={stateFilter}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              disabled={loading}
              className={filter.state}
              onClick={() => this.handleButtonClick(index)}
            >
              {filter.label}
            </button>
          ))}
        </IssueFilter>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
