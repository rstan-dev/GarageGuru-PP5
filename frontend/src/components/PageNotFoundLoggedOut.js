import React from 'react';

const PageNotFoundLoggedOut = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4 mt-5">404 Error<br/>Page Not Found</h1>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <a href="/login" className="btn btn-primary">Please log in</a>
    </div>
  );
};

export default PageNotFoundLoggedOut;