// DrawRectangle.js
var ctx;
var canvas = document.getElementById('canvas1')
function main() {
    // Retrieve <canvas> element
    // var canvas = document.getElementById('canvas1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    // Draw a black rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    var v1 = new Vector3([2.25, 2.25, 0]); // Instantiate the vector
    drawVector(v1, 'red'); // Draw the vector
}

function drawVector(v, color) {
    ctx.beginPath(); // Begin a new path for the drawing
    ctx.moveTo(200, 200); // This sets the starting point at the center of the canvas
    ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20); // Draw the line to (x, y) scaled by 20
    ctx.strokeStyle = color; // Set the color of the line
    ctx.stroke(); // Execute the drawing
}

function handleDrawEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var x1 = parseFloat(document.getElementById('xCoord1').value);
    var y1 = parseFloat(document.getElementById('yCoord1').value);
    var x2 = parseFloat(document.getElementById('xCoord2').value);
    var y2 = parseFloat(document.getElementById('yCoord2').value);

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, 'red'); 
    drawVector(v2, 'blue');
    console.log(v1, v2)
}

function angleBetween(v1, v2) {
    let dotProduct = Vector3.dot(v1, v2);
    let magnitudeV1 = v1.magnitude();
    let magnitudeV2 = v2.magnitude();

    if (magnitudeV1 === 0 || magnitudeV2 === 0) {
        console.log("One of the vectors is of zero length.");
        return;
    }

    let cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);

    // Handle potential floating point arithmetic issues and ensure value is within valid range [-1, 1]
    cosTheta = Math.max(-1, Math.min(1, cosTheta));

    // Calculate the angle in radians and then convert it to degrees
    let angleRadians = Math.acos(cosTheta);
    let angleDegrees = angleRadians * (180 / Math.PI); // Convert radians to degrees

    console.log(`The angle between the vectors is: ${angleDegrees.toFixed(2)} degrees.`);
    return angleDegrees;
}


function handleDrawOperationEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = parseFloat(document.getElementById('xCoord1').value);
    var y1 = parseFloat(document.getElementById('yCoord1').value);
    var x2 = parseFloat(document.getElementById('xCoord2').value);
    var y2 = parseFloat(document.getElementById('yCoord2').value);
    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    var operation = document.getElementById('op-select').value;

    // Draw original vectors
    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    switch(operation) {
        case 'add':
            var v3 = v1.add(v2);
            drawVector(v3, 'green');
            break;
        case 'sub':
            var v4 = v1.sub(v2);
            drawVector(v4, 'green');
            break;
        case 'multiply':
            var scalar = parseFloat(document.getElementById('scalar').value); // Assuming input for scalar
            var v5 = v1.mul(scalar);
            var v6 = v2.mul(scalar);
            drawVector(v5, 'green');
            drawVector(v6, 'green');
            break;
        case 'divide':
            var scalar = parseFloat(document.getElementById('scalar').value); // Assuming input for scalar
            var v7 = v1.div(scalar);
            var v8 = v2.div(scalar);
            drawVector(v7, 'green');
            drawVector(v8, 'green');
            break;
        case 'angle between':
            angleBetween(v1, v2);
            break;
        case 'area':
            var area = v1.cross(v2).length() / 2; // Using length of cross product for area of parallelogram, divided by 2 for triangle
            console.log('Area of triangle formed by v1 and v2:', area);
            break;
        case 'magnitude':
            console.log('Magnitude of v1:', v1.magnitude());
            console.log('Magnitude of v2:', v2.magnitude());
            break;
        case 'normalize':
            var v9 = v1.normalize();
            var v10 = v2.normalize();
            drawVector(v9, 'green');
            drawVector(v10, 'green');
            break;
    }
}