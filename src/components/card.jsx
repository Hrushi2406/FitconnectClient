import { Link } from "react-router-dom";

function Card({ image, name, category, rating, startPrice, linkTo }) {
  return (
    <Link to={linkTo} style={{ color: "black" }}>
      <div className="card">
        <img
          className="img"
          // src="https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          src={
            image ??
            "https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          }
          alt="Fitconnect images"
        />
        <div className="secondary-background p2">
          <h6 className="title mb1">{name}</h6>
          <p className="mb1">{category}</p>
          <div className="spaced-between">
            <p>Fitconnect Rating</p>
            <p>{rating}</p>
          </div>
        </div>

        <button className="btn">Starting from ₹{startPrice}</button>
      </div>
    </Link>
  );
}

export default Card;
