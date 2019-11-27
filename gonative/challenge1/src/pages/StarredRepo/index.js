import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default function StarredRepo({ navigation }) {
  const repository = navigation.getParam('repo');

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

StarredRepo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repo').name,
});

StarredRepo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
