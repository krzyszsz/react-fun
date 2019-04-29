import * as React from 'react';

export interface Props {
    fireWidth: number;
}

function normalizeColor(color : number) : number
{
    const max : number = 256;
    return ~~(color*max);
}

function denormalizeColor(color : number) : number
{
    const max : number = 256;
    return color / max;
}

const pixelSize : number = 2;
const sizeX : number = 150;
const sizeY : number = 50;
const imageArray : Array<Array<[number, number, number]>> = new Array<Array<[number, number, number]>>(sizeY);

let canvas1 : HTMLCanvasElement | null;
let context1 : CanvasRenderingContext2D | null;
let canvas2 : HTMLCanvasElement;
let context2 : CanvasRenderingContext2D | null;
let firstFrameToRender : boolean = true;
let randomPrevious : number = 0;
let _fireWidth : number;

function init() : void {
    if (canvas2 != null) {
        return;
    }

    // buffer canvas
    canvas2 = document.createElement('canvas');
    canvas2.width = sizeX * pixelSize;
    canvas2.height = sizeY * pixelSize;
    context2 = canvas2.getContext('2d');

    // real canvas
    canvas1 = document.getElementById("flameCanvas") as HTMLCanvasElement;
    if (canvas1 != null)
    {
        context1 = canvas1.getContext('2d');
    }

    return;
}


function generateImageArray() : void
{
    if (firstFrameToRender) {
        for (let x=0; x<sizeX; x++) {
            imageArray[x] = new Array<[number, number, number]>(sizeY);
            for (let y=0; y<sizeY; y++) {
                imageArray[x][y] = [0, 0, 0];
            }
        }

        firstFrameToRender = false;
    }

    randomPrevious = randomPrevious * 0.8 - (Math.random() - 0.5) * 0.2;    // simulates wind and random air movements
    if (randomPrevious < -1)
    {
        randomPrevious = -1;
    }

    if (randomPrevious > 1)
    {
        randomPrevious = 1;
    }

    for (let x=0; x<sizeX; x++) {
        for (let y=0; y<sizeY-1; y++) {
            //const r = normalizeColor(((x + y + t/10 ) % (sizeX+sizeY) ) / (sizeX+sizeY)) ;

            let localRandom1 = Math.random() * 0.3 + 0.9;
            let localRandom2 = (Math.random() - 0.5)/2;
            let localRandom3 = (Math.random() - 0.5)/2;
            let localRandom4 = (Math.random() - 0.5) /2 + 1;
            let localRandom5 = (Math.random() - 0.2) * 0.4 ;

            const newColor = denormalizeColor( 
                Math.max(0,

                Math.sqrt(y / sizeY) *
                (
                    (imageArray[x][y][0] * 0.08) + 
                    (imageArray[x][y+1][0] * 0.9 * localRandom1) +
                    (x > 1 ? imageArray[x-1][y][0] * (randomPrevious + localRandom2) * 0.5 : 0) +
                    (x < sizeX-1 ? imageArray[x+1][y][0] * (-randomPrevious + localRandom3) * 0.5 : 0) +
                    (y < sizeY-2 ? imageArray[x][y+2][0] * (localRandom5) * 0.5 : 0)
                ) * localRandom4
                ));

            const r = normalizeColor(newColor) ;
            const g = 0;
            const b = 0;
            imageArray[x][y] = [r, g, b];
        }

        // Initialization vector - line on the bottom of the fire:
        imageArray[x][sizeY-1] = [normalizeColor(  Math.abs(Math.sin(x * (2 * Math.PI) / (_fireWidth*2) )) ) ,
             0,
             0];
    }
}



function draw() : void 
{
    init();

    if (context1 == null || context2 == null) {
        console.log("Context == null. Exiting.");
        return;
    }

    generateImageArray();
    for (let i=0; i<imageArray.length; i++) {
        for (let j=0; j<imageArray[i].length; j++) {
            context2.fillStyle = `rgb(${imageArray[i][j][0]},${imageArray[i][j][1]}, ${imageArray[i][j][2]})`;
            context2.fillRect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
        }
    }

    context1.drawImage(canvas2, 0, 0);
  
    window.setTimeout(()=> window.requestAnimationFrame(draw), 10);
}

function FlameAnimation({ fireWidth = 20 }: Props) {
    console.log("FlameAnimation initialized.");
    _fireWidth = fireWidth;
    window.requestAnimationFrame(draw);

    return (
        <div>
            <canvas id="flameCanvas" width={sizeX*pixelSize} height={sizeY*pixelSize}>

            </canvas>
        </div>
    );
}

export default FlameAnimation;

