import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class State extends Component {
    static PropTypes = {
        children: PropTypes.element,
        store: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.stateStore = this.props.store;
        this.state = this.stateStore.state;
    }

    componentDidMount() {
        this.subscription = this.stateStore.subscribe(state =>
            this.setState(state)
        );
    }

    componentWillUnmount() {
        this.stateStore.unSubscribe(this.subscription);
    }

    render() {
        return (
            <div>
                {cloneElement(this.props.children, {
                    ...this.state
                })}
            </div>
        );
    }
}
