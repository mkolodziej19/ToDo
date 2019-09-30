let tasks;

document.addEventListener('DOMContentLoaded', async function gettingTasks(id){
	tasks = await fetch(`http://localhost:3000/api/tasks/${id}`)
		.then(res => res);
	return tasks;
}, false);

let formWaiting = document.getElementById('addFormWaiting');
let formProgress = document.getElementById('addFormProgress');
let formFinished = document.getElementById('addFormFinished');

let itemListWaiting = document.getElementById('itemsWaiting');
let itemListProgress = document.getElementById('itemsProgress');
let itemListFinished = document.getElementById('itemsFinished');

let filter = document.getElementById('filter');


// Form submit event
formWaiting.addEventListener('submit', addItemWaiting);
formProgress.addEventListener('submit', addItemProgress);
formFinished.addEventListener('submit', addItemFinished);
// Delete event
itemListWaiting.addEventListener('click', removeItemWaiting);
itemListProgress.addEventListener('click', removeItemProgress);
itemListFinished.addEventListener('click', removeItemFinished);
// Move right event
itemListWaiting.addEventListener('click', moveRightWaiting);
itemListProgress.addEventListener('click', moveRightProgress);
// Move left event
itemListProgress.addEventListener('click', moveLeftProgress);
itemListFinished.addEventListener('click', moveLeftFinished);


// Filter event
filter.addEventListener('keyup', filterItems);
filter.addEventListener('change', filterItems);


// Add itemWaiting
function addItemWaiting(e){
  addItem(e, document.getElementById('itemWaiting').value, itemListWaiting, formWaiting, "waiting");
}
// Add itemProgress
function addItemProgress(e){
  addItem(e, document.getElementById('itemProgress').value, itemListProgress, formProgress, "progress");
}
// Add itemFinished
function addItemFinished(e){
  addItem(e, document.getElementById('itemFinished').value, itemListFinished, formFinished, "finished");
}

// Add item
function addItem(e, newItem, itemList, form, column){
	  e.preventDefault();
	if (newItem!='') {

  	let li = document.createElement('li');
  	li.className = 'list-group-item my-1';

  	let deleteBtn = document.createElement('button');
  	deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  	deleteBtn.appendChild(document.createTextNode('X'));
  	li.appendChild(deleteBtn);

		let div = document.createElement('div');
		div.className = "	mx-auto";
		let p = document.createElement('p');
		p.appendChild(document.createTextNode(newItem));

  	div.appendChild(p);
  	li.appendChild(div);

		if (column === "waiting" || column === "progress"){
	  	let rightBtn = document.createElement('button');
			rightBtn.className = 'btn btn-success btn-sm float-right right';
	  	rightBtn.appendChild(document.createTextNode('>>'));
	  	li.appendChild(rightBtn);
		}

		if (column === "progress" || column === "finished"){
	  	let leftBtn = document.createElement('button');
			leftBtn.className = 'btn btn-warning btn-sm float-left left';
	  	leftBtn.appendChild(document.createTextNode('<<'));
	  	li.appendChild(leftBtn);
		}

  	itemList.appendChild(li);
		form.reset();
	}
}


// Remove item waiting
function removeItemWaiting(e){
	removeItem(e, itemListWaiting);
}
// Remove item progress
function removeItemProgress(e){
	removeItem(e, itemListProgress);
}
// Remove item finished
function removeItemFinished(e){
	removeItem(e, itemListFinished);
}

// Remove item
function removeItem(e, itemList){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      let li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}


// Move right waiting
function moveRightWaiting(e){
	if(e.target.classList.contains('right')){
		let li = e.target.parentElement;
		addItem(e, li.children[1].innerText, itemListProgress, formProgress, "progress");
		itemListWaiting.removeChild(li);
	}
}
// Move right progress
function moveRightProgress(e){
	if(e.target.classList.contains('right')){
		let li = e.target.parentElement;
		addItem(e, li.children[1].innerText, itemListFinished, formFinished, "finished");
		itemListProgress.removeChild(li);
	}
}
// Move left progress
function moveLeftProgress(e){
	if(e.target.classList.contains('left')){
		let li = e.target.parentElement;
		addItem(e, li.children[1].innerText, itemListWaiting, formWaiting, "waiting");
		itemListProgress.removeChild(li);
	}
}
// Move left finished
function moveLeftFinished(e){
	if(e.target.classList.contains('left')){
		let li = e.target.parentElement;
		addItem(e, li.children[1].innerText, itemListProgress, formProgress, "progress");
		itemListFinished.removeChild(li);
	}
}


// Filter Items
function filterItems(e){
  // convert text to lowercase
  let text = e.target.value.toLowerCase();
  // Get lis
	let items = [];
  items[0] = itemListWaiting.getElementsByTagName('li');
  items[1] = itemListProgress.getElementsByTagName('li');
  items[2] = itemListFinished.getElementsByTagName('li');
  // Convert to an array
	for(let i=0; i<3; i++){
	  Array.from(items[i]).forEach(function(item){
  	  let itemName = item.children[1].textContent;
  	  if(itemName.toLowerCase().indexOf(text) != -1){
  	    item.style.display = 'block';
  	  } else {
  	    item.style.display = 'none';
  	  }
	  });
	}
}


