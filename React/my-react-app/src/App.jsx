import Header from './Header.jsx'
import Footer from './Footer.jsx';  
import Food from './Food.jsx';
import Card from './Card.jsx';
import Student from './Student.jsx';
import UserGreet from './UserGreet.jsx';
import Minis from './Minis.jsx';
import Button from './Button.jsx';

function App() {

  return (
    <>
    <Header />
    <Student name=" Patrick" age={43} IsStudent={true} />
    <Student name=" John" age="30" IsStudent={false} />
    <Student />
    <UserGreet isLoggedin={true} username="Patrick"/>
    <Card />
    <Minis />
    <Food />
    <Button />
    <Footer />
    <Food />
    </>

  );
}

export default App

//Props are arguments passed into React components. Props are passed to components via HTML attributes.
//Props are used to pass data from one component to another.
//Props are read-only. They are immutable which means once the props are set, they cannot be changed.
//Props allow you to pass data from a parent component to a child component.
//Props can be of any data type, including strings, numbers, arrays, objects, and functions.
//In this example, we are passing name, age, and IsStudent as props to the Student component.
//We can also set default props for a component. In the Student component, we have set default props for name, age, and IsStudent.
//If no props are passed to the Student component, it will use the default props.
//We can also use conditional rendering in the Student component to display different content based on the value of the IsStudent prop.
//If IsStudent is true, it will display "is a student", otherwise it will display "is not a student".
//We can also use destructuring to extract the props in the Student component.
//Lists and keys are important in React for rendering multiple components dynamically.
//In the Food component, we are using an array of food items and mapping over them to create a list of food items.
//Each item in the list should have a unique key prop to help React identify which items have changed, are added, or are removed.
//In this example, we are using the index of the array as the key prop. However, in a real application, it is better to use a unique identifier for each item.
//We can also pass the list of food items as props to the Food component from the App component.
//In this example, we are importing and using multiple components in the App component to create a complete application.
//We are using fragments (<> </>) to wrap multiple components without adding extra nodes to the DOM.
//This is a common practice in React to avoid unnecessary divs in the DOM.
//Finally, we are exporting the App component as the default export of the module so that it can be imported and used in other parts of the application.
//Event handling in React is similar to handling events in plain HTML/JavaScript, but with some syntactical differences.
//In React, event names are written in camelCase instead of lowercase.
//In React, we pass a function as the event handler instead of a string.
//In the Card component, we are handling the onDoubleClick event on the button element.
//When the button is double-clicked, it triggers the handleClick function which changes the button text to "Ouch!".
//We can also handle other events like onClick, onChange, onSubmit, etc. in a similar way.
//In the Button component, we are using the useState hook to manage the state of the count variable.
//The handleClick2 function increments the count variable each time the button is clicked, up to a maximum of 5 clicks.
//We are also logging messages to the console based on the value of the count variable.
//This demonstrates how to handle events and manage state in React components.
//You can further enhance the Button component by adding more features, such as disabling the button after a certain number of clicks or changing its appearance based on the state.
//Feel free to experiment with different event types and handlers to create a more dynamic user experience.
//Happy coding!