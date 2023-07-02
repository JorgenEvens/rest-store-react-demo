import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { isLoading, isOK } from '@jorgenevens/rest-store';
import { useResource, usePage } from '@jorgenevens/rest-store/redux';

import link from 'lib/link';

export default
function ProjectPulls() {
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

    if (loading)
        return (<strong>Loading</strong>);

    if (!project)
        return (<strong>Not Found</strong>);

    return (
        <div>
            <h2>
                <Link to={link`/users/${project.owner.login}`}>
                    { project.owner.login }
                </Link>
                <span> / </span>
                <Link to={link`/projects/${project.full_name}`}>
                    { project.name }
                </Link>
            </h2>
            {(pulls || []).map(pull => (
                <div key={ pull.number }>
                    <h2>{pull.title}</h2>
                    <div>
                        <span className="tag">open</span>
                        {(pull.labels || []).map(label => (
                            <span className="tag"
                                key={ label.id }
                                style={{ background: '#' + label.color }}>
                                {label.name}
                            </span>
                        ))}
                    </div>
                    <p>
                        {pull.body}
                    </p>
                </div>
            ))}
        </div>
    );
}
