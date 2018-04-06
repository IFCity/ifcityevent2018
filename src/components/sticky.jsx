import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Sticky extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
    }


    update() {
        const topOffset = 51;
        const stickyHeight = 40;
        const setInitialHeights = (elements) => {
            [].forEach.call(elements, (sticky, index) => {
                let offset = topOffset;
                if (index === 1) {
                    offset = stickyHeight * (index + 1) + topOffset + 30;
                }
                if (index === 2) {
                    offset = stickyHeight * (index + 1) + topOffset + 30;
                }
                sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top - offset);
            });
        };

        const stickies = document.querySelectorAll('[data-sticky]');
        setInitialHeights(stickies);

        let handler = () => {
            const top = document.documentElement.scrollTop || document.body.scrollTop;
            const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

            [].forEach.call(stickies, (sticky, index) => {
                const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10);
                const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || stickyInitial;
                const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom;

                if (top >= stickyEnter && top <= stickyExit) {
                    sticky.classList.add('sticky');
                } else {
                    sticky.classList.remove('sticky');
                }
            });
        };

        document.body.removeEventListener('scroll', handler, false);

        document.addEventListener('scroll', handler);
    }

    componentDidMount() {
        setTimeout(() => {
            this.update();
        }, 500);
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.update();
        }, 500);
    }

    render() {
        const { className, enter, exit, children } = this.props;
        return (<div
            className={`Sticky ${className}`}
            data-sticky
            data-sticky-enter={enter}
            data-sticky-exit={exit}
        >
            {children}
        </div>);
    }
}

Sticky.propTypes = {
    className: PropTypes.string,
    enter: PropTypes.string,
    exit: PropTypes.string,
    children: PropTypes.node
};
