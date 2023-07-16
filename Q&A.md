##### What is the difference between Component and PureComponent? Give an example where it might break my app.

The main difference between them lies in how they handle component updates and perform shallow equality checks on props and state.

By default, the Component class implements a simple shallow comparison for props and state to determine if the component should re-render.

The shouldComponentUpdate method in PureComponent performs a shallow comparison of the current and next props and state. If there are no changes, it prevents re-rendering of the component and its child components. The shallow comparison in PureComponent reduces unnecessary re-renders when props or state haven't changed.
PureComponent performs shallow equality checks on props and state. If a component depends on nested data structures or mutable objects, a shallow comparison might not accurately detect changes within those objects. This can lead to unexpected behavior or missed updates.

For example, if you pass an array or object as a prop to a PureComponent, and you mutate that array or object without creating a new reference, the PureComponent won't detect the change and won't trigger a re-render. This can result in stale or incorrect UI rendering.

##### Context + ShouldComponentUpdate might be dangerous. Why is that?

When the context value changes, all components that consume that context will re-render, regardless of whether their props have changed or not.
This behavior can be problematic when using shouldComponentUpdate to optimize component rendering, as the optimization might be bypassed due to context updates triggering unnecessary re-renders.
Combining Context with shouldComponentUpdate can lead to infinite update loops if not handled carefully. If a component shouldComponentUpdate method relies on a context value that it consumes, and the shouldComponentUpdate itself modifies that context value, it can result in an infinite loop of updates.

##### Describe 3 ways to pass information from a component to its PARENT

- Props and Callback Functions:
  Pass data from a child component to its parent component through props and callback functions.
  The parent component can pass a callback function as a prop to the child component. When the child component needs to send data back to the parent, it can call the callback function and pass the data as an argument.

- Context API:
  Context API allows to create a shared context between components without explicitly passing props through the component tree.
  The child component can access the context value, by accessing the context value, the child component can pass information back to the parent component without the need for intermediate components to pass props.

- Redux or State Management Libraries:
  With Redux, passing information from a child component to its parent can be achieved through actions and reducers.
  The child component can dispatch an action that carries the necessary data.The parent component, which is connected to the Redux store, can then receive the data through the corresponding reducer and update its state accordingly.

##### Give 2 ways to prevent components from re-rendering

- Pure Components or React.memo:
  With React.memo higher-order component (HOC) you can perform shallow equality checks on props and prevent re-rendering when the props have not changed. By wrapping a component with React.memo we can optimize rendering by skipping unnecessary re-renders when props have not changed.

- Using shouldComponentUpdate:
  By implementing shouldComponentUpdate and comparing the current props and state with the next props and state, you can decide whether the component should re-render or not.

##### What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a component that allows you to group multiple elements together without adding an extra wrapping element to the DOM. It is a way to return multiple elements from a component without introducing unnecessary markup.

Fragments can lead to the following issues:

- Key attribute in fragments: Not providing a key attribute or using duplicate keys within a fragment list can cause rendering errors and unexpected behavior.
- Strict mode compatibility: When using React's StrictMode, the sibling relationship enforced by fragments can be more strict.

##### Give 3 examples of the HOC pattern.

- WithLoading HOC:
  This HOC can be used to add a loading indicator to a component while data is being fetched.

```
const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

// Usage
const MyComponent = ({ data }) => {
  return <div>{data}</div>;
};

const MyComponentWithLoading = withLoading(MyComponent);
```

- WithAuthorization HOC:
  This HOC can be used to restrict access to a component based on the user's authorization status.

```
const withAuthorization = (WrappedComponent) => {
  return ({ isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <div>Unauthorized access</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

// Usage:
const MyComponent = ({ data }) => {
  return <div>{data}</div>;
};

const MyComponentWithAuthorization = withAuthorization(MyComponent);
```

##### What's the difference in handling exceptions in promises, callbacks and async...await?

- Promises:
  With promises, you can use the .catch() method to handle any errors that occur during the promise chain. Exceptions within a promise are caught by the nearest .catch() block up the chain.
- Callbacks:
  We need to manually check for errors and handle them accordingly within the callback function. Callback-based code can sometimes lead to callback hell, where nested callbacks make the code harder to read and maintain.
- async...await:
  async...await is a syntactic sugar that provides a more synchronous-looking code structure. With async...await, you can use try...catch blocks to handle exceptions within the asynchronous function.

##### How many arguments does setState take and why is it async.

It takes two arguments: partialState and an optional callback function.
It is async because React batches state updates for performance optimization, the state updates triggered by setState are not guaranteed to be immediately reflected in the component's state.
Instead, React performs the state updates asynchronously, and the component's state is updated during the next reconciliation phase.

##### List the steps needed to migrate a Class to Function Component

- Move Props and State:
  Identify the props used in the class component and declare them as parameters in the function component.
  Remove the constructor and move any initialization of state variables to the function component's body using the useState hook.

- Move Lifecycle Methods:
  Identify any lifecycle methods used in the class component and replace them with corresponding React hooks in the function component.
  For example:
  componentDidMount -> useEffect with an empty dependency array ([]) to mimic the behavior of mounting.
  componentDidUpdate -> useEffect with appropriate dependencies to mimic the behavior of updating.
  componentWillUnmount -> useEffect with a cleanup function to mimic the behavior of unmounting.

- Convert Class Methods to Functions:
  Identify any class methods used in the class component and convert them to regular JavaScript functions within the function component.

- Refactor Render Method:
  Move the JSX code from the class component's render method into the function component's return statement.
  Replace this.props with the corresponding parameter names in the function component.

##### List a few ways styles can be used with components.

Inline Styles:

```
const MyComponent = () => {
  const styles = {
    color: 'red',
    fontSize: '16px',
  };

  return <div style={styles}>Hello, World!</div>;
};
```

CSS Modules:

```
import styles from './MyComponent.module.css';

const MyComponent = () => {
  return <div className={styles.container}>Hello, World!</div>;
};
```

CSS-in-JS Libraries

```
import styled from 'styled-components';

const StyledComponent = styled.div`
  color: blue;
  font-size: 16px;
`;

const MyComponent = () => {
  return <StyledComponent>Hello, World!</StyledComponent>;
};
```

##### How to render an HTML string coming from the server

You can use the dangerouslySetInnerHTML prop.

```
const MyComponent = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

```

However you should be very careful whit this because that could lead to security issues. It is a good practice to sanitize the html.
