import React from 'react';
import './Success.css';

const Success = () => {
    return (
        <main>
            <div className="containerS">
                <div className="alert">
                    <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Well done! ✔</h4>
                    <p>You have successfully registered. Please login to continue to access the courses.</p>
                    <hr/>
                    <p class="mb-0"><button class="btn btn-primary" type="button" href="#">Login</button></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Success;