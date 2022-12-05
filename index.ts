import { getObstacleEvents } from './computer-vision';

//Types
interface AutonomousCar{
    isRunning?: boolean;
    respond: (events: Events) => void;
}

interface AutonomousCarProps{
    isRunning?: boolean;
    steeringControl: Steering;
}

interface Events{
    [event: string]: boolean;
}

interface Control{
    execute: (command: string) => void;
}

interface Steering extends Control{
    turn: (direction: string) => void;
}

//Classes
class Car implements AutonomousCar{
    isRunning;
    steeringControl;
    constructor(props:AutonomousCarProps){
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }

    respond(events: Events){
        Object.keys(events).forEach((eventKey)=>{
            if(!eventKey) return

            if(this.isRunning){
                return console.log('Car is running.')
            }
            else return console.log('Car is off.')

            if(eventKey === 'ObstacleLeft'){
                this.steeringControl.turn('right')
            }
            else if(eventKey === 'ObstacleRight'){
                this.steeringControl.turn('left')
            }
        })
    }
}

class SteeringControl implements Steering{
    execute(command: string){
        console.log('Executing: ' +  command);
    }

    turn(direction: string){
        this.execute('Turn ' + direction);
    }
}

//Declarations
const steering = new SteeringControl()

const autonomousCar = new Car({isRunning: true, steeringControl: steering});


//Execute
autonomousCar.respond(getObstacleEvents())

steering.turn('left')
