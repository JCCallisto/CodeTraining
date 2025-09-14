import Caedo from './assets/Caedo.jpeg';

function Card(){

    const handleClick = (e) => {
        e.target.textContent = "Ouch!";
    };

    return (
        <div className="card">
            <h2>Caedo</h2>
            <img src={Caedo} alt="Marine"/>
            <p>Caedo on a Leash</p>
            <button onDoubleClick={(e) => handleClick(e)}>Click Here</button>
        </div>
    );
}

export default Card;

// In this Card component, we define a handleClick function that changes the button's text to "Ouch!" when it is double-clicked. The button element has an onDoubleClick event listener that triggers the handleClick function, passing the event object as an argument. The e.target property refers to the button element that was clicked, allowing us to modify its text content directly.
// This demonstrates how to handle events in React and update the UI based on user interactions.
// The onDoubleClick event is used here to respond to double-click actions on the button.
// You can customize the event handling logic as needed for your application.
// Note: The button text will change only when double-clicked, not on a single click.
// You can also use other event types such as onClick, onMouseOver, onMouseOut, etc., depending on your requirements.
// Remember to import and use the Card component in your main application file (e.g., App.jsx) to see it in action.
// The image Caedo.jpeg should be placed in the specified path (./assets/) for it to be displayed correctly.
// Make sure to adjust the import path if your project structure is different.
// You can add more styles and functionality to the Card component as needed.
// This example illustrates the use of event handling in React components, specifically using the onDoubleClick event to change the button text when it is double-clicked.
// Event handling in React is similar to handling events in plain HTML/JavaScript, but with some syntactical differences.
// In React, event names are written in camelCase (e.g., onClick, onDoubleClick) instead of lowercase.
// Additionally, in React, you pass a function as the event handler rather than a string.
// This allows you to define more complex logic and state management within your components.
// You can also use arrow functions directly in the event listener, as shown in the onDoubleClick attribute of the button element.
// This approach is useful for passing additional arguments or accessing the event object directly.
// Overall, event handling is a crucial aspect of building interactive user interfaces in React applications.
// Remember to test the component in your application to ensure it behaves as expected.
// You can further enhance the Card component by adding more features, such as state management using React hooks (e.g., useState) to track the number of clicks or other interactions.
// Feel free to experiment with different event types and handlers to create a more dynamic user experience.
// You can also add CSS styles to the Card component to improve its appearance and layout.
// This example serves as a basic introduction to event handling in React components.
// For more advanced event handling scenarios, consider using libraries like Redux or Context API for state management in larger applications.
// Remember to keep your components modular and reusable for better maintainability.
// You can also explore other React features such as conditional rendering, lists and keys, and forms to build more complex applications.
// Happy coding!