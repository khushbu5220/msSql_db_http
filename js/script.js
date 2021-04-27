  // Register form 
  const form = document.getElementById('reg-form')
  form.addEventListener('submit', registerUser)

  async function registerUser(event) {
    event.preventDefault()
    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const marks = document.getElementById('marks').value

    

    // Fetching data from body 
    const result = await fetch('/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        age,
        marks
      })
    }).then((res) => res.json())

    if (result.status === 'ok') {
      // everythign went fine
      alert('Successfully registered')
    } else {
      alert(result.error)
    }
  }
