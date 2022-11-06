const React = require('react');
const {Component} = require('react');

class Try extends Component {
    render() {
        return (
            <li>
                <b>{this.props.value.fruit}</b> - {this.props.index}
            </li>
        );
    }
}

module.exports = Try;
