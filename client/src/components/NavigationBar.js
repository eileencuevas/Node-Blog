import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Bar = styled.div`
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-between;

    h1 {
        padding: 1rem;
        margin: 0 1rem;
        color: white;
        font-size: 3.5rem;
    }

    nav {
        width: 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`

const BlogLink = styled(NavLink)`
    color: white;
    text-decoration: none;

    &:active {
        color: red;
    }
`

const NavigationBar = () => {
    return(
        <Bar>
            <h1>Node Blog</h1>
            <nav>
                <BlogLink to='/users/'>All Users</BlogLink>
                <BlogLink to='/posts/'>All Posts</BlogLink>
            </nav>
        </Bar>
    );
}

export default NavigationBar;