
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

// In this Button component, we use the useState hook to manage a count state variable that tracks the number of times the button has been clicked.
// The handleClick2 function increments the count each time the button is clicked, up to a maximum of 5 clicks. If the button is clicked more than 5 times, it logs a message asking the user to stop clicking.
// The button element has an onClick event listener that triggers the handleClick2 function when clicked.
// This demonstrates how to use state and event handling in React components to create interactive UI elements.
// The useState hook is imported from React and is used to declare state variables in functional components.
// The setCount function is used to update the count state variable, which causes the component to re-render with the new value.
// You can customize the button text and styling as needed for your application.
// Remember to import and use the Button component in your main application file (e.g., App.jsx) to see it rendered in the UI.
// You can further enhance the Button component by adding more features, such as disabling the button after a certain number of clicks or changing its appearance based on the count value.
// Feel free to experiment with different state management techniques and event handling logic to create more complex and interactive components.
// This example serves as a basic introduction to using state and event handling in React functional components.
// Happy coding!