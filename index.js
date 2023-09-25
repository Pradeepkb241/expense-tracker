var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

window.onload = load();

function load()
{
    // window.location.assign('index.html');
    const dataFromLocalStorage = localStorage.getItem("expenses");
    const parsedData = JSON.parse(dataFromLocalStorage);
    if(Array.isArray(parsedData)){
        for(const row of parsedData){
            addToExpenseList(row.expense,row.description,row.category,row.id);
        }
    }
}

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

/**Add to UI */
function addToExpenseList(item,description,category,id){
  const obj = {
    expense : item,
    description : description,
    category : category,
    id,
  }
  let li = document.createElement('li');
  li.className = 'list-group-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(item));
  li.appendChild(document.createTextNode(' - '));
  li.appendChild(document.createTextNode(description));
  li.appendChild(document.createTextNode(' - '));
  li.appendChild(document.createTextNode(category));

  // Create del button element
  var deleteBtn = document.createElement('button');
  console.log(obj);
  deleteBtn.setAttribute("data-id",obj.id+"");

  var editBtn =document.createElement('button');
  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  editBtn.className = 'btn btn-success btn-sm float-right delete'
  // Append text node
  deleteBtn.appendChild(document.createTextNode('delete Expense'));
  editBtn.appendChild(document.createTextNode('Edit Expense'));
//   deleteBtn.addEventListener('click', function () {
//     localStorage.removeItem(obj.id); 
//   });

    // Append button to li
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
  
    // Append li to list
    itemList.appendChild(li);

}

// Add item
function addItem(e){
  e.preventDefault();

  // Get input value
  var expense = document.getElementById('item').value;
  var description = document.getElementById('description').value;
  var category = document.getElementById('category').value;
 

  let expenseObj = {
    expense : expense,
    description : description,
    category : category,
    id:new Date().getTime()
  }
  const expensesData = localStorage.getItem("expenses");
  const expenses = JSON.parse(expensesData) ||[];
  expenses.push(expenseObj);
  addToExpenseList(expense,description,category,expenseObj.id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    const id = e.target.attributes["data-id"]?.value;
    const expensesData = localStorage.getItem("expenses");
    const expenses = JSON.parse(expensesData);
    let arr = [];
    for(const expense of expenses){
        if(id!=expense.id){
           arr.push(expense);
        }
    }
    localStorage.setItem("expenses",JSON.stringify(arr));
      var li = e.target.parentElement;
      itemList.removeChild(li);
  }
}

// Filter Items
function filterItems(e){
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function(item){
    var itemName = item.firstChild.textContent;
    if(itemName.toLowerCase().indexOf(text) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}