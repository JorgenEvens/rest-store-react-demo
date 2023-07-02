import React from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

import { isLoading, isOK } from '@jorgenevens/rest-store';
import { useResource, usePage } from '@jorgenevens/rest-store/redux';

import link from 'lib/link';

export default
function Project() {
    const { projectId } = useParams();

    const project = useResource(projectId, {
        namespace: 'projects',
    });

    const loading = isLoading(project);

    const pulls = usePage(1, `project.${projectId}.pulls`, {
        namespace: 'issues',
        condition: isOK(project),
        params: {
            projectId,
            type: 'pull_request'
        },
    });

    const issues = usePage(1, `project.${projectId}.issues`, {
        namespace: 'issues',
        condition: isOK(project),
        params: {
            projectId,
            type: 'issue'
        },
    });

    if (loading)
        return (<strong>Loading</strong>);

    if (!project)
        return (<strong>Not Found</strong>);

    const last_pushed = moment(project.pushed_at).fromNow();

    return (
        <div>
            <h1>Projects</h1>
            <div>
                <h2>
                    <Link to={link`/users/${project.owner.login}`}>
                        { project.owner.login }
                    </Link>
                    <span> / {project.name}</span>
                </h2>
                <hr />
                <nav>
                    <ul>
                        <li>
                            <Link to={link`/projects/${projectId}/issues`}>
                                { issues.length } issues
                            </Link>
                        </li>
                        <li>
                            <Link to={link`/projects/${projectId}/pulls`}>
                                { pulls.length } pulls
                            </Link>
                        </li>
                    </ul>
                </nav>
                <hr />
                <ul>
                    <li>Stars: {project.stargazers_count}</li>
                    <li>Forks: {project.forks_count}</li>
                    <li>Clone: {project.ssh_url}</li>
                    <li>Last Pushed: {last_pushed}</li>
                </ul>
            </div>
        </div>
    );
}
