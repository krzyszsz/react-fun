import * as React from 'react';

export interface Props {
    fireWidth: number;
}

class FlameAnimation extends React.Component<Props, object> {
    private animationInterval : number = 15;
    private pixelSize : number = 5;
    private sizeX : number = 150;
    private sizeY : number = 50;
    
    private canvas1 : HTMLCanvasElement | null = null;
    private context1 : CanvasRenderingContext2D | null = null;
    private randomPrevious : number = 0;
    private _timerID : number | null = null;

    componentWillUnmount() {
        if (this._timerID != null) {
            clearInterval(this._timerID);
        }
      }

    constructor(props: Props) {
        super(props);
        console.log("FlameAnimation initialized.");
        
        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.generateImageArray = this.generateImageArray.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        window.requestAnimationFrame(this.draw);
    }

    render() {
        var divStyle = {
            width:  this.sizeX*this.pixelSize + "px",
            height: this.sizeY*this.pixelSize + "px"
          };

        return (
            <div>
                <canvas id="flameCanvas" width={this.sizeX} height={this.sizeY} style={divStyle} >
                </canvas>
            </div>
        );
    }

    normalizeColor(color : number) : number
    {
        const max : number = 256;
        return ~~(color*max);
    }
    
    denormalizeColor(color : number) : number
    {
        const max : number = 256;
        return color / max;
    }

    init() : void {
        this.canvas1 = document.getElementById("flameCanvas") as HTMLCanvasElement;
        if (this.canvas1 != null)
        {
            this.context1 = this.canvas1.getContext('2d');
        }
    
        return;
    }
    
    
    generateImageArray(imageArray : Uint8ClampedArray) : void
    {
        this.randomPrevious = this.randomPrevious * 0.8 - (Math.random() - 0.5) * 0.2;    // simulates wind and random air movements
        if (this.randomPrevious < -1)
        {
            this.randomPrevious = -1;
        }
    
        if (this.randomPrevious > 1)
        {
            this.randomPrevious = 1;
        }
    
        const lineIncrement : number = this.sizeX * 4;

        for (let x=0; x<this.sizeX; x++) {

            const y0 = -1;
            let index = y0 * lineIncrement + 4 * x;
            let indexBelow = (y0+1) * lineIncrement + 4 * x;
            let indexBelow2 = (y0+2) * lineIncrement + 4 * x;
            let indexLeft = y0 * lineIncrement + 4 * (x - 1);
            let indexRight = y0 * lineIncrement + 4 * (x + 1);

            for (let y=0; y<this.sizeY-1; y++) {

                index += lineIncrement;
                indexBelow += lineIncrement;
                indexBelow2 += lineIncrement;
                indexLeft += lineIncrement;
                indexRight += lineIncrement;
    
                let localRandom1 = Math.random() * 0.3 + 0.9;
                let localRandom2 = (Math.random() - 0.5)/2;
                let localRandom3 = (Math.random() - 0.5)/2;
                let localRandom4 = (Math.random() - 0.5) /2 + 1;
                let localRandom5 = (Math.random() - 0.2) * 0.4 ;
    
                const newColor = this.denormalizeColor( 
                    Math.max(0,
    
                    Math.sqrt(y / this.sizeY) *
                    (
                        (imageArray[index] * 0.08) + 
                        (imageArray[indexBelow] * 0.9 * localRandom1) +
                        (x > 1 ? imageArray[indexLeft] * (this.randomPrevious + localRandom2) * 0.5 : 0) +
                        (x < this.sizeX-1 ? imageArray[indexRight] * (-this.randomPrevious + localRandom3) * 0.5 : 0) +
                        (y < this.sizeY-2 ? imageArray[indexBelow2] * (localRandom5) * 0.5 : 0)
                    ) * localRandom4
                    ));
    
                const r = this.normalizeColor(newColor) ;
                // const g = 0;
                // const b = 0;
                imageArray[index] = r;
                imageArray[index+1] = 0;//g;
                imageArray[index+2] = 0;//b;
                imageArray[index+3] = 255; // No transparency!
            }
    
            // Initialization vector - line on the bottom of the fire:
            index = 4 * (this.sizeY-1) * this.sizeX + 4 * x;
            imageArray[index] = this.normalizeColor(  Math.abs(Math.sin(x * (2 * Math.PI) / (this.props.fireWidth*2) )) );
            imageArray[index+1] = 0;
            imageArray[index+2] = 0;
            imageArray[index+3] = 255;
        }
    }

    draw() : void {
        this.init();
    
        if (this.context1 == null ) {
            console.log("Context == null. Exiting.");
            return;
        }
    
        const imgData : ImageData = this.context1.getImageData(0, 0, this.sizeX, this.sizeY);
        const imageArray : Uint8ClampedArray = imgData.data;
        this.generateImageArray(imageArray);
        this.context1.putImageData(imgData, 0, 0);
    
        if (this._timerID == null) {
            this._timerID = window.setInterval(()=> window.requestAnimationFrame(this.draw), this.animationInterval);
        }
    }
}

export default FlameAnimation;