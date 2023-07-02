import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { isLoading, isOK } from '@jorgenevens/rest-store';
import { useResource, usePage } from '@jorgenevens/rest-store/redux';

export default
function User() {
    const { userId } = useParams();

    const user = useResource(userId, {
        namespace: 'users',
    });

    const loading = isLoading(user);

    const projects = usePage(1, `user.${userId}`, {
        namespace: 'projects',
        condition: isOK(user),
        params: { userId },
    });

    if (loading)
        return (<strong>Loading</strong>);

    if (!user)
        return (<strong>Not Found</strong>);

    const projectUrl = project => `/projects/${project.full_name}`;
    const projectsUrl = `/users/${user.login}/projects`;

    return (
        <div>
            <h1>{user.login}</h1>
            <hr />
            <nav>
                <Link to={projectsUrl}>Projects</Link>
            </nav>
            <hr />
            <ul>
                <li>Repos: { user.public_repos }</li>
                <li>Gists: { user.public_gists }</li>
                <li>Followers: { user.followers }</li>
                <li>Following: { user.following }</li>
            </ul>
            <hr />
            <ul>
                {projects.map(project => (
                    <li key={project.full_name}>
                        <Link to={projectUrl(project)}>
                            {project.full_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
