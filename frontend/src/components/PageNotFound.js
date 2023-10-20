import React from 'react';

const PageNotFound = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4 mt-5">404 Error<br/>Page Not Found</h1>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary">Back to All Jobs</a>
    </div>
  );
};

export default PageNotFound;