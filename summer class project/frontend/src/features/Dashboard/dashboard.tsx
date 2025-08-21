import React from 'react';
import Header from '../../shared/components/header/header';

export default function Dashboard() {
    return (
        <>
        <Header/>
        <div className="dashboard-wrapper">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            {/* Additional dashboard content can be added here */}
        </div>
        </>
    );
}