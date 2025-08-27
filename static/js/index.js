export function updateButtons() {
  const buttonContainer = document.querySelector('.block-select-day')
  const data = JSON.parse(localStorage.getItem('days'))
  // check if current days data are the same as new data
  const firstBtn = document.querySelector('.block-select-day button')
  const currentDate = new Date(data[0])
  const oldData = firstBtn.innerText
  const newData = currentDate.getDate() + "/" + currentDate.getMonth()
  if (oldData && oldData == newData){
    return;
  }
  // add value to buttons
  buttonContainer.querySelectorAll('.btn-day').forEach((button, index) => {
    const date = new Date(data[index])
    button.innerText = date.getDate() + "/" + (date.getMonth() + 1)
  });
}


export function addButtonEvent(updateChart) {
  document.querySelector('.block-select-day').addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.btn-day');

    if (clickedButton) {
      // Remove color
      document.querySelectorAll('.btn-day').forEach(chip =>
        chip.removeAttribute('aria-selected')
      );
      // Set color for selected button
      clickedButton.setAttribute('aria-selected', 'true');

      const dayIndex = clickedButton.dataset.index;
      updateChart(dayIndex);
    }
  });
}


export function formSubmit(fetchWeather) {
  document.querySelector('form').addEventListener('submit', (event) => {
    // prevent page redirect
    event.preventDefault();
    const cityInput = document.querySelector('input[name="city"]').value;
    console.log('input: ',cityInput);
    fetchWeather(cityInput)
  });
}