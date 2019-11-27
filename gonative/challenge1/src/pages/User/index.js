import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loader,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor() {
    super();

    this.state = {
      stars: [],
      loading: false,
      user: {},
      page: 0,
      lastPage: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    await this.setState({ user });

    this.loadRepositories();
  }

  loadRepositories = async () => {
    const { user, page, stars, lastPage } = this.state;

    // If we didn't reach last page
    if (!lastPage) {
      this.setState({ loading: true });

      const response = await api.get(
        `/users/${user.login}/starred?page=${page + 1}`,
      );

      const starsCount = response.data.length;

      // If this request had any results
      if (starsCount > 0) {
        this.setState({
          stars: stars.concat(response.data),
          page: page + 1,
          loading: false,
          lastPage: starsCount < 30, // Try to predict last page (<30 length)
        });
      } else {
        this.setState({
          loading: false,
          lastPage: true,
        });
      }
    }
  };

  refreshList = async () => {
    await this.setState({
      stars: [],
      page: 0,
      lastPage: false,
    });

    this.loadRepositories();
  };

  handleNavigate = repo => {
    const { navigation } = this.props;
    navigation.navigate('StarredRepo', { repo });
  };

  render() {
    const { stars, loading, refreshing, user } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loader />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadRepositories}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
