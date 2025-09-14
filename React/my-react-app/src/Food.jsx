
function Food(){

    const food1 = "Pizza";
    const food2 = "Sushi";

    return (
        <ul>
            <li>Steak</li>
            <li>{food1}</li>
            <li>{food2.toUpperCase()}</li>
        </ul>
    );
}

export default Food;

//In this Food component, we define two food items as constants: food1 and food2. We then return an unordered list (ul) containing three list items (li). The first item is a static string "Steak", while the second and third items use JavaScript expressions to display the values of food1 and food2, respectively. The food2 item is converted to uppercase using the toUpperCase() method.
//This demonstrates how to use JSX to embed JavaScript expressions within HTML-like syntax in React components.
//The curly braces {} are used to indicate that the content inside them is a JavaScript expression that should be evaluated.
//You can customize the food items and add more functionality as needed for your application.
//Remember to import and use the Food component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//This example serves as a basic introduction to creating functional components in React and using JSX syntax.
//Feel free to experiment with different data types, expressions, and HTML elements to create more complex components.
//Happy coding!