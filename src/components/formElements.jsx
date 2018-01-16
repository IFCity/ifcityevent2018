import React, {Component} from 'react';
import _ from 'lodash';


class CategoryDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        const options = _(this.props.categories)
            .map(cat => <option value={cat.id}>{cat.name}</option>)
            .value();
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
