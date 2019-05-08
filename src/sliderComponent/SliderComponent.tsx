import * as React from 'react';
import Slider from '@material-ui/lab/Slider';

export interface Props {
    value : number
  }


class SliderComponent extends React.Component<Props, object> {
    constructor(props:Props) {
        super(props);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    render() {
        const divStyle = {
            color: 'blue',
            width: 500
          };

        return (
            <div className="slidecontainer">
                <Slider value={this.props.value} style={divStyle} onChange={this.onSliderChange} />
            </div>
        );
    }

    onSliderChange() {
        this.setState(() => {});    // TODO: Unfinished.
    }
}

export default SliderComponent;