
function Footer() {
    return (
        <footer>
        <p> {new Date().getFullYear()} My React App. All rights reserved.</p>
        </footer>
    );
    }

export default Footer;

//The Footer component is a simple functional component that returns a footer element containing a paragraph with the current year and a copyright message.
//We use JavaScript's Date object to get the current year dynamically.
//This ensures that the footer always displays the correct year without needing manual updates.
//You can customize the footer content and styling as needed for your application.
//Remember to import and use the Footer component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//This example serves as a basic introduction to creating and using functional components in React.
//Feel free to experiment with different HTML elements and JavaScript expressions to create more complex components.
//Happy coding!