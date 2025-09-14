

function Student(props) {
  return (
    <div className="student">
      <h2>Student Component</h2>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Student: {props.IsStudent ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default Student;

//In this Student component, we define a functional component that takes props as an argument.
//We then return a JSX structure that displays the student's name, age, and whether they are a student or not based on the IsStudent prop.
//The component uses conditional rendering to display "Yes" if IsStudent is true and "No" if it is false.
//This demonstrates how to use props in React components to pass data from a parent component to a child component.
//You can further enhance the Student component by adding styles, additional information, or functionality as needed for your application.
//Remember to import and use the Student component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//This example serves as a basic introduction to creating and using functional components with props in React.
//Feel free to experiment with different HTML elements and JavaScript expressions to create more complex components.
//Happy coding!