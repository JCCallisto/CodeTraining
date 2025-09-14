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

// In this App component, we import several other components including Header, Footer, Food, Card, Student, UserGreet, Minis, and Button.
// The App component serves as the main component that combines and renders all these imported components.
// We use JSX syntax to structure the layout of the application, placing each component in the desired order.
// The Student component is used multiple times with different props to demonstrate how to pass data to components.
// The UserGreet component is also used with props to show conditional rendering based on the isLoggedin status.
// The Button component includes state management and event handling to demonstrate interactivity.
// Finally, we export the App component as the default export so it can be used in other parts of the application, such as index.js where it is typically rendered to the DOM.
// This structure allows for a modular and organized approach to building a React application, making it easier to manage and maintain.
// You can further enhance the App component by adding styles, additional components, or functionality as needed for your application.
// Remember to ensure that all imported components are correctly defined and exported in their respective files.
// This example serves as a basic introduction to composing a React application using multiple components and props.
// Happy coding!