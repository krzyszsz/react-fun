import * as React from 'react';

export interface Props {
    fireWidth: number;
}

class FlameAnimation extends React.Component<Props, object> {
    private pixelSize : number = 3;
    private sizeX : number = 150;
    private sizeY : number = 50;
    private imageArray : Array<Array<[number, number, number]>> = new Array<Array<[number, number, number]>>(this.sizeY);
    
    private canvas1 : HTMLCanvasElement | null = null;
    private context1 : CanvasRenderingContext2D | null = null;
    private canvas2 : HTMLCanvasElement | null = null;
    private context2 : CanvasRenderingContext2D | null = null;
    private firstFrameToRender : boolean = true;
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
        return (
            <div>
                <canvas id="flameCanvas" width={this.sizeX*this.pixelSize} height={this.sizeY*this.pixelSize}>
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
        if (this.canvas2 != null) {
            return;
        }
    
        // buffer canvas
        this.canvas2 = document.createElement('canvas');
        this.canvas2.width = this.sizeX * this.pixelSize;
        this.canvas2.height = this.sizeY * this.pixelSize;
        this.context2 = this.canvas2.getContext('2d');
    
        // real canvas
        this.canvas1 = document.getElementById("flameCanvas") as HTMLCanvasElement;
        if (this.canvas1 != null)
        {
            this.context1 = this.canvas1.getContext('2d');
        }
    
        return;
    }
    
    
    generateImageArray() : void
    {
        if (this.firstFrameToRender) {
            for (let x=0; x<this.sizeX; x++) {
                this.imageArray[x] = new Array<[number, number, number]>(this.sizeY);
                for (let y=0; y<this.sizeY; y++) {
                    this.imageArray[x][y] = [0, 0, 0];
                }
            }
    
            this.firstFrameToRender = false;
        }
    
        this.randomPrevious = this.randomPrevious * 0.8 - (Math.random() - 0.5) * 0.2;    // simulates wind and random air movements
        if (this.randomPrevious < -1)
        {
            this.randomPrevious = -1;
        }
    
        if (this.randomPrevious > 1)
        {
            this.randomPrevious = 1;
        }
    
        for (let x=0; x<this.sizeX; x++) {
            for (let y=0; y<this.sizeY-1; y++) {
                //const r = normalizeColor(((x + y + t/10 ) % (sizeX+sizeY) ) / (sizeX+sizeY)) ;
    
                let localRandom1 = Math.random() * 0.3 + 0.9;
                let localRandom2 = (Math.random() - 0.5)/2;
                let localRandom3 = (Math.random() - 0.5)/2;
                let localRandom4 = (Math.random() - 0.5) /2 + 1;
                let localRandom5 = (Math.random() - 0.2) * 0.4 ;
    
                const newColor = this.denormalizeColor( 
                    Math.max(0,
    
                    Math.sqrt(y / this.sizeY) *
                    (
                        (this.imageArray[x][y][0] * 0.08) + 
                        (this.imageArray[x][y+1][0] * 0.9 * localRandom1) +
                        (x > 1 ? this.imageArray[x-1][y][0] * (this.randomPrevious + localRandom2) * 0.5 : 0) +
                        (x < this.sizeX-1 ? this.imageArray[x+1][y][0] * (-this.randomPrevious + localRandom3) * 0.5 : 0) +
                        (y < this.sizeY-2 ? this.imageArray[x][y+2][0] * (localRandom5) * 0.5 : 0)
                    ) * localRandom4
                    ));
    
                const r = this.normalizeColor(newColor) ;
                const g = 0;
                const b = 0;
                this.imageArray[x][y] = [r, g, b];
            }
    
            // Initialization vector - line on the bottom of the fire:
            this.imageArray[x][this.sizeY-1] = [this.normalizeColor(  Math.abs(Math.sin(x * (2 * Math.PI) / (this.props.fireWidth*2) )) ) ,
                 0,
                 0];
        }
    }

    draw() : void {
        this.init();
    
        if (this.context1 == null || this.context2 == null || this.canvas2 == null) {
            console.log("Context == null. Exiting.");
            return;
        }
    
        this.generateImageArray();
        for (let i=0; i<this.imageArray.length; i++) {
            for (let j=0; j<this.imageArray[i].length; j++) {
                this.context2.fillStyle = `rgb(${this.imageArray[i][j][0]},${this.imageArray[i][j][1]}, ${this.imageArray[i][j][2]})`;
                this.context2.fillRect(i*this.pixelSize, j*this.pixelSize, this.pixelSize, this.pixelSize);
            }
        }
    
        this.context1.drawImage(this.canvas2, 0, 0);
        if (this._timerID == null) {
            this._timerID = window.setInterval(()=> window.requestAnimationFrame(this.draw), 20);
        }
    }
}

export default FlameAnimation;