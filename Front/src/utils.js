export const MachineStates = {
  OFF: 0,
  UNLOADED: 1,
  IDLE: 2,
  LOADED: 3
}

export const getStateColor = function (state) {
  switch (state) {
    case MachineStates.OFF: return '#d2d6df'
    case MachineStates.UNLOADED: return '#dd3644'
    case MachineStates.IDLE: return '#ffc106'
    case MachineStates.LOADED: return '#28a746'
    default: return 'transparent'
  }
}

export const getStateName = function (state) {
  switch (state) {
    case MachineStates.OFF: return 'Off'
    case MachineStates.UNLOADED: return 'Unloaded'
    case MachineStates.IDLE: return 'Idle'
    case MachineStates.LOADED: return 'Loaded'
    default: return ''
  }
}

export const getDurationText = function (duration) {
  return duration.days() + ' days, ' + duration.hours() + ' hrs, ' + duration.minutes() + ' min, ' + duration.seconds() + ' sec.'
}
