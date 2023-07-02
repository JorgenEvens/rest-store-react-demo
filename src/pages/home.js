import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default
function Home() {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('JorgenEvens');
    const [ project, setProject ] = useState('JorgenEvens/rest-store');

    const onViewUser = () => {
        navigate(`/users/${username}`)
    };

    const onViewProject = () => {
        navigate(`/projects/${project}`);
    };

    return (
        <div>
            <div>
                <h2>View User</h2>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="button" value="View" onClick={onViewUser} />
            </div>
            <div>
                <h2>View Project</h2>
                <input type="text" value={project} onChange={e => setProject(e.target.value)} />
                <input type="button" value="View" onClick={onViewProject} />
            </div>
        </div>
    );
}
