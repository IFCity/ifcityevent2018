import React, { Component } from 'react';


class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-bottom">
                <div className="container-fluid">
                    <p className="text-muted">&copy; IFCityEvent, 2017-2018</p>
                </div>
            </div>
        );
    }
}

export default Footer;
