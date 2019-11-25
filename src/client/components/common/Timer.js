import React from 'react';

class TimerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0,
        };
        this.tick = this.tick.bind(this);
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:
        this.timer();
    }

    componentWillUnmount() {
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    timer() {
        this.timer = setInterval(this.tick, 50);
    }

    tick() {
        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered
        /* eslint-disable */

        this.setState({ elapsed: new Date() - this.props.start });
    }

    render() {
        // Calculate elapsed to tenth of a second:
        const elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        const seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.
        return (
            <p>
                Your order was submitted <b>{seconds} seconds</b> ago.
            </p>
        );
    }
}

export const Timer = TimerComponent;
