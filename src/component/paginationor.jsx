import React from 'react';
import _ from 'lodash';

const Paginator = (props) => {
    const { totalCount, currentPage, pageSize, onPageChange } = props;
    console.log(currentPage);
    const pagesCount = Math.ceil(totalCount / pageSize);
    if(pagesCount === 1) return null;
    const pages = _.range(1,pagesCount + 1);

    return ( 
       <nav>
        <ul className="pagination">
            {pages.map(page => (
                 <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}><a  onClick={()=>onPageChange(page)} className="page-link">{page}</a></li>
            ))}
           
        </ul>
       </nav>
     );
}
 
export default Paginator;