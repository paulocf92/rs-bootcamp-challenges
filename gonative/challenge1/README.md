# Challenge 1

## Description

In this challenge we'll add new features to the app developed over the course of this module.

## Features

### Repositories' loading

Add a loading indicator using `<ActivityIndicator />` before loading the starred repositories list on User page.

### Infinite scrolling

Add infinite scrolling to the starred repositories list, this way once the user reaches the list's bottom **20%** the app will fire another request to retrieve the next page's items and add them to the list. The code will look like the following:

```js
<Stars
  onEndReachedThreshold={0.2} // Load more items when the user reaches the bottom 20%
  onEndReached={this.loadMore} // Function to load more items
  // The rest of the props
>
```

To request a new page from Github use the parameter `page` at end of the URL:

```
https://api.github.com/users/diego3g/starred?page=2
```

### Pull to Refresh

Add a new feature for whenever the user pulls down starred repositories' list it will be updated effectively resetting the state, that is, it will return to page 1, displaying only the first thirty repositories.

The "Pull to Refresh" feature is available by default in FlatList component and can be implemented with the following code:

```js
<Stars
  onRefresh={this.refreshList} // Function fires when the user pulls down the list
  refreshing={this.state.refreshing} // Variable that stores a true/false state and represents if the list is being updated or not
  // The rest of the props
>
```

### WebView

Create a new page within the app accessible by clicking on a starred repository. This page must have only the app header. The content will be a WebView, that is, an integrated browser that shows the attribute `html_url` present in a starred repository object.

[WebView](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md) Docs.

Example code:

```js
<WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
```

Results:

![WebView](https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-06/master/.github/exemplo-web-view.png)
