import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const PageTitle = () => {
    const location = useLocation();
    const { id } = useParams();
    const { pathname } = location;
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        switch (pathname) {
            case '/':
                setPageTitle('Product List');
                break;
            case `/product/${id}`:
                setPageTitle('Product Detail');
                break;
            default:
                setPageTitle('Page not found');
        }
    }, [pathname, id]);

    return <p>{pageTitle}</p>;
};

export default PageTitle;