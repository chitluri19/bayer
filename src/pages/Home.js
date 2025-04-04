const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-3 text-primary">Jayakrishna Liver Diagnosis</h1>
        <p className="lead">
          Trusted hospital for liver care and diagnostics. Your health is our priority.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hospital"
          className="img-fluid mt-4"
          style={{ maxHeight: "300px" }}
        />
      </div>
    </div>
  );
};

export default Home;
