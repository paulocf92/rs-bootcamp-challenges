# Challenge 2

## Description

In this challenge we'll add new features to the app developed throughout this module.

## Features

### Error Handling

Add a `try/catch` block to the `handleSubmit` function in component `Main`. Should a repository not be found through Github API add a red border around the text input that tracks the repository name.

### Duplicate Repository

Validate the input repository before attempting to call the Github API within `handleSubmit` function thus avoiding duplicate entries, that is, if it still doesn't exist in the state.

If it does, fire an error so that it's caught by our `try/catch` block added in the previous feature.

```js
throw new Error("Duplicate repository");
```

### State Filter

Add a state filter to the issue list. This filter must track whether the issue is open, closed or an option to display both.

Request examples:

```
https://api.github.com/repos/rocketseat/unform/issues?state=all
https://api.github.com/repos/rocketseat/unform/issues?state=open
https://api.github.com/repos/rocketseat/unform/issues?state=closed
```

The full documentation can be found [here](https://developer.github.com/v3/issues/#parameters-1).

### Pagination

Add pagination to the issue list. The Github API shows at maximum 30 issues per page and you may control current page number through a request parameter:

```
https://api.github.com/repos/rocketseat/unform/issues?page=2
```

Add a button to next and previous page. The previous page button must be disabled for the first page.
