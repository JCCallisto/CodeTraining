
function userGreet(props) {

    if(props.isLoggedin) {
        return <h2>Welcome {props.username}</h2>
    } else {
        return <h2>Not Logged in</h2>
    }
}

export default userGreet;

//The UserGreet component is a functional component that takes props as an argument.
//It checks the value of the isLoggedin prop to determine whether to display a welcome message with the username or a "Not Logged in" message.
//If isLoggedin is true, it displays "Welcome {username}", where {username} is the value of the username prop.
//If isLoggedin is false, it displays "Not Logged in".
//This demonstrates conditional rendering in React based on the props passed to the component.
//You can further enhance the UserGreet component by adding styles, additional information, or functionality as needed for your application.
//Remember to import and use the UserGreet component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//This example serves as a basic introduction to creating and using functional components with props and conditional rendering in React.
//Feel free to experiment with different HTML elements and JavaScript expressions to create more complex components.
//Happy coding!