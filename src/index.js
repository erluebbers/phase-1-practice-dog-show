document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

function fetchDogs() {
  return fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => createDogTable(data))
}

function createDogTable (array) {
  array.forEach(obj => createDogObj(obj)) 
}

function createDogObj (dog) {
  let dogRow = document.createElement('tr')
    dogRow.innerHTML = `
    <tr>
      <td> ${dog.name} </td>
      <td> ${dog.breed} </td>
      <td> ${dog.sex} </td>
      <td><button class="edit-dog">Edit Dog</button></td>
    </tr>
    `
    dogRow.dataset.id = dog.id
    dogRow.querySelector('.edit-dog').addEventListener('click', () => {
      editDog(dog)
    })
    displayDogTable(dogRow)
  }

function displayDogTable (element) {
  document.querySelector('#table-body').appendChild(element)
}

function editDog (dog) {
  document.querySelector("#dog-form").name.value = dog.name
  document.querySelector("#dog-form").breed.value = dog.breed
  document.querySelector("#dog-form").sex.value = dog.sex

  document.querySelector('#dog-form').addEventListener('submit', (e) => {
    e.preventDefault()
    handleSubmit(dog.id)
  })

}

function handleSubmit (id) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: 
      {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify({
      name: document.querySelector("#dog-form").name.value,
      breed: document.querySelector("#dog-form").breed.value,
      sex: document.querySelector("#dog-form").sex.value
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .then(fetchDogs())
}