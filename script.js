let initial = {workTime: 1500, breakTime: 300, timer: -1, counter: 0} //Default Values

let workTime = initial.workTime
let breakTime = initial.breakTime
let timer = initial.timer  // gets the ID to be used to terminate the timing interval
// let counter = initial.counter

let timeDisplay = document.querySelector('.timer')
let currentPhase = document.querySelector('.currentPhase')
let sessionTime = document.querySelector('.sessionTime')
let breakDisplay = document.querySelector('.breakTime')

function startWorking() {
  if (workTime >= 0) {
    console.log(`work: ${formatToTime(workTime)}`)
    timeDisplay.innerHTML = formatToTime(workTime)
    // currentPhase.innerHtml = 'workTime'
    workTime--
    // check_counter('check')
  } else {
    clearInterval(timer)
    resetTimer('breakTime')
    // counter++
    timer = setInterval(startResting, 1000)
    currentPhase.innerHTML = 'Break'
  }
}


function startResting() {
  if (breakTime >= 0) {
    console.log(`rest: ${formatToTime(breakTime)}`)
    timeDisplay.innerHTML = formatToTime(breakTime)
    breakTime--
  } else {
    clearInterval(timer)
    resetTimer('workTime')
    timer = setInterval(startWorking, 1000)
    currentPhase.innerHTML = 'Session'
  }
  
}

function resetTimer(name) {
  // if (name == 'workTime' && workTime <= 0) {
  //   workTime = initial.workTime
  // } else if (name = 'breakTime' && breakTime <= 0) {
  //   breakTime = initial.breakTime
  // }
  switch(name) {
    case 'workTime':
      if (workTime <= 0) {
        workTime = parseInt(sessionTime.innerHTML) * 60
      }
      break
    
    case 'breakTime':
      if (breakTime <= 0) {
        breakTime = parseInt(breakDisplay.innerHTML) * 60
      }
      break
  }
}


// function check_counter(action) {
//   switch(action) {
//     case 'check' :
//       if (counter >= 3) {
//         clearInterval(timer)
//       }
//       break;
    
//     case 'reset':
//       if (counter >= 3) {
//         counter = initial.counter
//       }
//       break;

//     default:
//       break;
//   }
// }

function formatToTime(seconds) {
  let measuredTime = new Date(null)
  measuredTime.setSeconds(seconds)
  let hourSeconds = measuredTime.toISOString().substr(14, 5)

  return hourSeconds
}

// timer = setInterval(startWorking, 1000) // starts the pomodoro loop
// let start_breakTimer = setInterval(startResting, 1000)

// Browser Events start Here.
let buttons = Array.from(document.querySelectorAll('button'))

buttons.forEach(function(button) {
  // console.log(typeof(button.id))
  button.addEventListener('click', () => {
    // console.log(button.id)
    switch(button.id) {
      case 'start':
        timer = setInterval(startWorking, 1000)
        break

      case 'stop':
        reset('basic')
        break

      case 'pause':
        clearInterval(timer)
        break

      case 'decreaseTime' :
        // console.log(button)
        workTime -= 60
        sessionTime.innerHTML = workTime / 60
        break

      case 'increaseTime' :
        workTime += 60
        sessionTime.innerHTML = workTime / 60
        break

      case 'decreaseBreak':
        breakTime -= 60
        breakDisplay.innerHTML = breakTime /60
        break;

      case 'increaseBreak':
        breakTime += 60
        breakDisplay.innerHTML = breakTime /60
        break

      default:
        reset('full')
        break
    }

  })
})

function reset(type) {
  // clearInterval(timer)
  // workTime = initial.workTime
  // breakTime = initial.breakTime
  // timer = initial.timer
  // counter = initial.counter
  // timeDisplay.innerHTML = formatToTime(workTime)
  // currentPhase.innerHTML = 'Session'
  // breakDisplay.innerHTML = initial.breakTime / 60
  // sessionTime.innerHTML = initial.workTime / 60

  switch (type) {
    case 'basic':
    clearInterval(timer)
    workTime = parseInt(sessionTime.innerHTML) * 60
    breakTime = parseInt(breakDisplay.innerHTML) * 60
    timer = initial.timer
    // counter = initial.counter
    timeDisplay.innerHTML = formatToTime(workTime)
    currentPhase.innerHTML = 'Session'

    break

    case 'full':
      clearInterval(timer)
      workTime = initial.workTime
      breakTime = initial.breakTime
      timer = initial.timer
      // counter = initial.counter
      timeDisplay.innerHTML = formatToTime(workTime)
      currentPhase.innerHTML = 'Session'
      breakDisplay.innerHTML = initial.breakTime / 60
      sessionTime.innerHTML = initial.workTime / 60
      
      break
  }
}

// to do
// fix the broken rest time counter and display