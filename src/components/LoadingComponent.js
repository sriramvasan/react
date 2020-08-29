import React, { Component } from 'react';

export const Loading =() => {
    return(
        <div className = "col-12 m-5 p-5">
                <span className ="fa fa-spinner fa-pause fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
        </div>
    );
}