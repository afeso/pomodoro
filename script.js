let initial = {workTime: 1500, breakTime: 300, timer: -1, counter: 0} //Default Values

let workTime = initial.workTime
let breakTime = initial.breakTime
let timer = initial.timer  // gets the ID to be used to terminate the timing interval

let timeDisplay = document.querySelector('.timer')
let currentPhase = document.querySelector('.currentPhase')
let sessionTime = document.querySelector('.sessionTime')
let restTime = document.querySelector('.restTime')

let alarm = new Audio('alarm-sound.wav')

function startWorking() {
  if (workTime >= 0) {
    console.log(`work: ${formatToTime(workTime)}`)
    timeDisplay.innerHTML = formatToTime(workTime)
    workTime--
    // check_counter('check')
  } else {
    clearInterval(timer)
    resetTimer('breakTime')
    // counter++
    alarm.play()
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
    alarm.play()
  }
  
}

function resetTimer(name) {
  switch(name) {
    case 'workTime':
      if (workTime <= 0) {
        workTime = parseInt(sessionTime.innerHTML) * 60
      }
      break
    
    case 'breakTime':
      if (breakTime <= 0) {
        breakTime = parseInt(restTime.innerHTML) * 60
      }
      break
  }
}

function formatToTime(seconds) {
  let measuredTime = new Date(null)
  measuredTime.setSeconds(seconds)
  let hourSeconds = measuredTime.toISOString().substr(14, 5)

  return hourSeconds
}

// timer = setInterval(startWorking, 1000) // starts the pomodoro loop in the console

// Browser Events start Here.
let buttons = Array.from(document.querySelectorAll('button'))

buttons.forEach(function(button) {
  button.addEventListener('click', () => {
    // console.log(button.id)
    switch(button.id) {
      case 'start':
        timer = setInterval(startWorking, 1000)
        timeChangerControls('disable')
        break

      case 'stop':
        renewPomodoro('basic')
        timeChangerControls('enable')
        break

      case 'pause':
        clearInterval(timer)
        timeChangerControls('enableOnlyStart') // this gets called by default when none of the conditions evalustes to true
        break

      case 'decreaseTime' :
        if (checkValueOfControlledElement(sessionTime)) {
          workTime -= 60
          sessionTime.innerHTML = workTime / 60
          timeDisplay.innerHTML = formatToTime(workTime)
        }
        break

      case 'increaseTime' :
        workTime += 60
        sessionTime.innerHTML = workTime / 60
        timeDisplay.innerHTML = formatToTime(workTime)
        break

      case 'decreaseBreak':
        if (checkValueOfControlledElement(restTime)) {
          breakTime -= 60
          restTime.innerHTML = breakTime / 60
        }

        break;

      case 'increaseBreak':
        breakTime += 60 
        restTime.innerHTML = breakTime / 60
        break

      default:
        renewPomodoro('full')
        timeChangerControls('enable')
        break
    }

  })
})

function renewPomodoro(type) {
  switch (type) {
    case 'basic':
    clearInterval(timer)
    workTime = parseInt(sessionTime.innerHTML) * 60
    breakTime = parseInt(restTime.innerHTML) * 60
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
      restTime.innerHTML = initial.breakTime / 60
      sessionTime.innerHTML = initial.workTime / 60
      
      break
  }
}

function checkValueOfControlledElement(element) {
  if (parseInt(element.innerHTML) >= 2) {
    return true
  } else {
    return false
  }
}

function timeChangerControls(state) {
  buttons.forEach(function(button) {
    if (button.dataset.timeChanger == 'true') {
      if (state == 'disable') {
        button.disabled = true
      } else if (state == 'enable') {
        button.disabled = false
      } else {
        button = document.getElementById('start')
        button.disabled = false
      }
    }
  })
}
