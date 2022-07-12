const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// The field is a 2D array of characters.
// The field is represented by a string of characters.
class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        //set the "home" position before the game starts
        this.field[0][0] = pathCharacter;
    }
    //method to run the game
    run() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isWithinLimits()) {
                console.log('You have fallen off the edge of the field.');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('You have fallen into a hole, better luck next time.');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('You have found the hat, you win! Congratulations!');
                playing = false;
                break;
            }
            //update the current location on the field
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }
    //method to ask the user for input
    askQuestion() {
        let direction = prompt('Please enter a direction: ');
        //upercase the direction
        direction = direction.toUpperCase();

        switch (direction) {
            case 'R':
                this.locationX++;
                break;
            case 'L':
                this.locationX--;
                break;
            case 'U':
                this.locationY--;
                break;
            case 'D':
                this.locationY++;
                break;
            case 'Q':
                console.log('You have quit the game.');
                process.exit();
                break;

            default:
                console.log('Invalid direction. Please enter either R, L, U, or D.');
                this.askQuestion();
                break;
        }
    }

    //method to check if the user is within the limits of the field
    isWithinLimits() {
        if (this.locationX < 0 || this.locationX >= this.field[0].length || this.locationY < 0 || this.locationY >= this.field.length) {
            return false;
        } else {
            return true;
        }
    }
    //method to check if the user is on a hole
    isHole() {
        if (this.field[this.locationY][this.locationX] === hole) {
            return true;
        } else {
            return false;
        }
    }
    //method to check if the user is on the hat
    isHat() {
        if (this.field[this.locationY][this.locationX] === hat) {
            return true;
        } else {
            return false;
        }
    }
    //method to print the field
    print() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                process.stdout.write(this.field[i][j]);
            }
            process.stdout.write('\n');
        }
    }
    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }
        // Set the "hat" location
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
}


const myfield = new Field(Field.generateField(10, 20, 0.25));
myfield.run();

