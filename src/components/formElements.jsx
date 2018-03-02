import React, {Component} from 'react';
import map from 'lodash/map';


class CategoryDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        const options = map(this.props.categories, cat => <option value={cat.id}>{cat.name}</option>);
        return (
            <select
                className="form-control"
                onChange={this.handleChange}
                value={this.props.event.category}
            >
                {options}
            </select>
        );
    }
}

export { CategoryDropdown };
