
function Header() {
    return(
        <header>
            <h1>My website</h1>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header;

//The Header component is a simple functional component that returns a header element containing a title and a navigation menu.
//The navigation menu is created using an unordered list (ul) with list items (li) containing anchor tags (a) for navigation links.
//This component can be imported and used in other parts of the application, such as in the main App component, to provide a consistent header across all pages.
//You can further customize the Header component by adding styles, additional links, or functionality as needed for your application.
//Remember to import and use the Header component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//This example serves as a basic introduction to creating and using functional components in React.
//Feel free to experiment with different HTML elements and JavaScript expressions to create more complex components.
//Happy coding!