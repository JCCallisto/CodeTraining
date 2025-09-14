
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
//You can include any valid JavaScript expression inside the curly braces, such as variables, function calls, or even complex expressions.
//In this example, we use the toUpperCase() method to convert the food2 string to uppercase before rendering it in the list.
//This allows for dynamic content generation based on JavaScript logic within the JSX structure.
//Remember to import and use the Food component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//You can further enhance the Food component by adding more food items, styles, or functionality as needed for your application.
//Feel free to experiment with different JavaScript expressions and methods to create more dynamic and interactive components.
//Happy coding!