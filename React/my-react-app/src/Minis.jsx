
function Minis() {
  const minis = [
    { id: 1, name: "Cadian", amount: 1000 },
    { id: 2, name: "Eldar" , amount: 50 },
    { id: 3, name: "Orks", amount: 750 },
    { id: 4, name: "Tyranids", amount: 500 },
    { id: 5, name: "Necrons", amount: 150 },
    { id: 6, name: "Tau", amount: 300 },
    { id: 7, name: "Space Marines", amount: 200 }
  ];

//minis.sort((a, b) => a.name.localeCompare(b.name)); //Alphabetical order
//minia.sort((a, b) => b.name.localeCompare(a.name)); //Reverse alphabetical order
//minis.sort((a, b) => a.amount - b.amount);  // Numerical order
//minis.sort((a, b) => b.amount - a.amount); // Reverse numerical order

// Shuffle the array using Fisher-Yates algorithm

//const lowamountofminis = minis.filter(mini => mini.amount < 200); // Filter minis with amount less than 200

//const listItems = lowamountofminis.map(lowamountofminis => (
            //<li key={lowamountofminis.id}>
            //{lowamountofminis.name}: &nbsp;<b>{lowamountofminis.amount}</b>
            //</li>));


//const highamountofminis = minis.filter(mini => mini.amount >= 200); // Filter minis with amount 200 or more

//const listItems = highamountofminis.map(highamountofminis => (
            //<li key={highamountofminis.id}>
            //{highamountofminis.name}: &nbsp;<b>{highamountofminis.amount}</b>
            //</li>));


  const listItems = minis.map(mini => (
    <li key={mini.id}>
      {mini.name}: &nbsp;<b>{mini.amount}</b>
    </li>));

  return (<ol>{listItems}</ol>);
}

export default Minis

//In this Minis component, we define an array of miniatures, each represented as an object with id, name, and amount properties.
//We then use the map function to iterate over the minis array and create a list item (li) for each miniature.
//Each list item displays the name and amount of the miniature, with the amount wrapped in bold tags (b) for emphasis.
//The key prop is set to the id of each miniature to help React identify which items have changed, are added, or are removed.
//Finally, we return an ordered list (ol) containing all the list items generated from the minis array.
//You can uncomment different sorting or filtering lines to see how they affect the displayed list of miniatures.
//Remember to import and use the Minis component in your main application file (e.g., App.jsx) to see it rendered in the UI.
//You can further enhance the Minis component by adding styles, additional properties, or functionality as needed for your application.
//Feel free to experiment with different JavaScript array methods and JSX syntax to create more dynamic and interactive components.
//Happy coding!