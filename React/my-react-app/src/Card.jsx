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

//In this Card component, we define a simple card layout that includes a title, an image, a description, and a button.
//We import an image file (Caedo.jpeg) and use it as the source for the img element.
//The handleClick function is defined to change the button text to "Ouch!" when the button is double-clicked. This is achieved by accessing the event target and modifying its textContent property.
//The button element has an onDoubleClick event listener that triggers the handleClick function when the button is double-clicked.
//This demonstrates how to handle events in React components and update the UI based on user interactions.
//You can customize the card content, styles, and functionality as needed for your application.
//Remember to import and use the Card component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//You can further enhance the Card component by adding more features, such as additional styling, animations, or interactivity.
//Feel free to experiment with different event types and handlers to create more dynamic and engaging components.
//This example serves as a basic introduction to creating interactive components in React.
//Happy coding!