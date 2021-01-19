import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1 className="text-center">React Formik</h1>
            <p><Link to="users">&gt;&gt; Manage Users</Link></p>
            <p><Link to="demo1">&gt;&gt; Demo 1</Link></p>
            <p><Link to="demo2">&gt;&gt; Demo 2</Link></p>
            <p><Link to="demo3">&gt;&gt; Demo 3</Link></p>
            <p><Link to="demo4">&gt;&gt; Demo 4</Link></p>
        </div>
    );
}

export { Home };