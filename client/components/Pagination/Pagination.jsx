import React from 'react';
import './Pagination.scss';

class Pagination extends React.Component {
    constructor(props) {
        super(props);   

        this.generatePages = this.generatePages.bind(this);
    }

    generatePages(numPages, currentPage, onPageClick) {
        let pages = [];
        const pageTabs = 5;
        
        for (let i = currentPage - 2, j = 0; i <= numPages && j < pageTabs; i++, j++) {
            if (i === currentPage) {
                pages.push(<li key={i} className="page-item active"><a>{i}</a></li>);
            } else if (i < 1 || i > numPages) {
                j--;
                // don't print any tabs for this case
            } else {
                pages.push(<li key={i} className="page-item"><a onClick={() => {onPageClick(i)}}>{i}</a></li>);
            }
        }

        return pages;
    }

    render() {
        let { numPages, totalEntries, numEntries, currentPage, onPageClick } = this.props;

        return (
            <div className="columns">
                <div className="centered">
                    <ul className="pagination col-mx-auto">
                        {this.generatePages(numPages, currentPage, onPageClick)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Pagination;