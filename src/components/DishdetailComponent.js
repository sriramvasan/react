import React, { Component } from "react";
import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <div>
          <Card>
            <CardImg top src={dish.image} alt={dish.name}></CardImg>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else return <div></div>;
  }

  renderComments(dish) {
    if (dish != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {dish.comments.map((a) => (
              <li>
                <p>{a.comment}</p>
                <p>
                  --{a.author}, {this.state.months[a.date.substr(5, 2) - 1]}{" "}
                  {a.date.substr(8, 2)},{a.date.substring(0, 4)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else return <div></div>;
  }

  render() {
    const dish = this.props.dish;
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">{this.renderDish(dish)}</div>
        <div className="col-12 col-md-5 m-1">{this.renderComments(dish)}</div>
      </div>
    );
  }
}

export default Dishdetail;
//{ this.renderComments }
