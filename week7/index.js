/*
*/


function addTodo(){
  console.log("button was clicked")
  const input = document.getElementById("list-input")
  console.log("input.value =", input.value)

  const ul = document.querySelector("ul")
  // const list = lists[0]
  console.log(ul)

  const li = document.createElement("li")
  li.textContent = input.value
  ul.appendChild(li)
}