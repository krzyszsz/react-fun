import * as React from 'react';
import Slider from '@material-ui/lab/Slider';

export interface Props {
    value? : number,
    onSliderChange?: (event: React.ChangeEvent<{}>, value: number) => void
  }

export default class SliderComponent extends React.Component<Props, object> {

    public MaxSliderValue : number = 400;

    constructor({value = 50, onSliderChange}:Props) {
        super({value, onSliderChange});
    }

    render() {
        const divStyle = {
            color: 'blue',
            width: this.MaxSliderValue,
            padding: '22px 0px',
          };

        return (
            <div className="slidecontainer" style={divStyle}>
                <Slider 
                    style={divStyle}
                    value={this.props.value}
                    onChange={this.props.onSliderChange}
                />
            </div>
        );
    }
}
