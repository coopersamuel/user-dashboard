import React from 'react';

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
                pages.push(<li key={i} className="page-item active"><span>{i}</span></li>);
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
            <ul className="pagination">
                <li key={'<'} className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={() => {onPageClick(--currentPage)}}>&lsaquo;</a>
                </li>
                {this.generatePages(numPages, currentPage, onPageClick)}
                <li key={'>'} className={`page-item ${currentPage === numPages ? 'disabled' : ''}`}>
                    <a onClick={() => {onPageClick(++currentPage)}}>&rsaquo;</a>
                </li>
            </ul>
        );
    }
}

export default Pagination;