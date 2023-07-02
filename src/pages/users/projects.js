import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { isLoading, isOK } from '@jorgenevens/rest-store';
import { useResource, usePage } from '@jorgenevens/rest-store/redux';

import link from 'lib/link';

export default
function UserProjects() {
    const [ page, setPage ] = useState(1);
    const { userId } = useParams();

    const user = useResource(userId, {
        namespace: 'users',
    });

    const projects = usePage(page, `user.${userId}`, {
        namespace: 'projects',
        condition: isOK(user),
        params: { userId }
    });

    const loading = isLoading(user);

    if (loading)
        return (<strong>Loading</strong>);

    if (!user)
        return (<strong>Not Found</strong>);

    const userUrl = `/users/${user.login}`;
    const projectUrl = (project) => link`/projects/${project.full_name}`;

    const onNext = () => {
        setPage(page + 1);
    };
    const onPrevious = () => {
        setPage(Math.max(1, page - 1));
    };

    return (
        <div>
            <h1>
                <Link to={userUrl}>{userId}</Link>
                <span> - Projects</span>
            </h1>
            <ul style={{ listStyle: 'none' }}>
                {(projects || []).map(project => (
                    <li key={ project.full_name }>
                        <Link to={projectUrl(project)}>
                            { project.full_name }
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={ onPrevious }>Previous</button>
            <button onClick={ onNext }>Next</button>
        </div>
    );
}
