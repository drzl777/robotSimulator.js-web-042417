'use strict';

function Robot() {
  // implement your solution here!
}

Robot.prototype.orient = function (direction) {
  let directions = [ 'east', 'west', 'north', 'south' ]
  if (directions.includes(direction)){
    this.bearing = direction
  } else {
    throw new Error("Invalid Robot Bearing")
  }
}

Robot.prototype.turnRight = function () {
  let directions = [ 'east', 'north', 'west', 'south' ]
  let bearIndex = directions.indexOf(this.bearing)
  bearIndex === 0 ? bearIndex = 3 : bearIndex -=1
  this.bearing = directions[bearIndex]
}

Robot.prototype.turnLeft = function () {
  let directions = [ 'west', 'north', 'east', 'south' ]
  let bearIndex = directions.indexOf(this.bearing)
  bearIndex === 0 ? bearIndex = 3 : bearIndex -=1
  this.bearing = directions[bearIndex]
}

Robot.prototype.at = function (x,y) {
  this.coordinates = [x,y]
}

Robot.prototype.advance = function () {
  switch(this.bearing) {
    case 'east':
      this.coordinates[0] += 1
      break
    case 'west':
      this.coordinates[0] -= 1
      break
    case 'north':
      this.coordinates[1] += 1
      break
    case 'south':
      this.coordinates[1] -= 1
      break
  }
}

Robot.prototype.instructions = function (dirString) {
  let instructions_arr = []
  for (let i = 0; i < dirString.length; i++) {
    switch(dirString[i]) {
      case 'R':
        instructions_arr.push('turnRight')
        break
      case 'A':
        instructions_arr.push('advance')
        break
      case 'L':
        instructions_arr.push('turnLeft')
        break
    }
  }
  return instructions_arr
}

Robot.prototype.place = function (initial) {
  this.orient(initial.direction)
  this.at(initial.x, initial.y)
}

Robot.prototype.evaluate = function (instructions) {
  let instructions_arr = this.instructions(instructions)
  while (instructions_arr.length > 0) {
    let next_instruct = instructions_arr.shift()
    this[next_instruct]()
  }
}
