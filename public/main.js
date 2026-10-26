
// Change an exercise's completed status.
const completedButtons = document.querySelectorAll('.completed-button')

Array.from(completedButtons).forEach(function(button) {
  button.addEventListener('click', function() {
    const id = this.dataset.id
    const completed = this.dataset.completed === 'true'

    fetch('/exercises', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        completed: !completed
      })
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Could not update exercise')
        }

        window.location.reload()
      })
      .catch(function(error) {
        console.error(error)
        alert('Could not update exercise. Please try again.')
      })
  })
})

// Delete an exercise.
const deleteButtons = document.querySelectorAll('.delete-button')

Array.from(deleteButtons).forEach(function(button) {
  button.addEventListener('click', function() {
    const id = this.dataset.id

    fetch('/exercises', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Could not delete exercise')
        }

        window.location.reload()
      })
      .catch(function(error) {
        console.error(error)
        alert('Could not delete exercise. Please try again.')
      })
  })
})