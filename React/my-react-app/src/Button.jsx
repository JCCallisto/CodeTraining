
import React, { useState } from "react";

function Button() {
  const [count, setCount] = useState(0);

  const handleClick2 = () => {
    const name = "Ouch!";
    if (count < 5) {
      setCount(count + 1);
      console.log(`${name} Button Clicked ${count + 1} times`);
    } else {
      console.log(`Seriously, Stop! ${name}`);
    }
  };

  return <button onClick={handleClick2}>Click Me!</button>;
}

export default Button;

//React hooks are special functions that let you "hook into" React features. For example, useState is a Hook that lets you add React state to function components.
// UseState is a Hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value.
// In this example, we use the useState hook to create a count state variable and a setCount function to update it. The handleClick2 function increments the count each time the button is clicked, up to a maximum of 5 clicks, and logs messages to the console accordingly.
// The onClick event listener is added to the button element, which triggers the handleClick2 function when the button is clicked.
// This demonstrates how to use state and event handling in a React functional component.
// You can add more complex logic and state management as needed for your application.
// Note: The button text does not change in this example, but you can modify the button text or other UI elements based on the state if desired.
// You can also use other hooks like useEffect, useContext, etc., depending on your requirements.
// Remember to import and use the Button component in your main application file (e.g., App.jsx) to see it in action.
// This example serves as a basic introduction to using the useState hook and event handling in React functional components.
// For more advanced state management scenarios, consider using libraries like Redux or Context API for larger applications.
// Keep your components modular and reusable for better maintainability.
// You can further enhance the Button component by adding more features, such as disabling the button after a certain number of clicks or changing its appearance based on the state.
// Feel free to experiment with different event types and handlers to create a more dynamic user experience.
// Happy coding!