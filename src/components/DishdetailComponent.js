import React , {Component} from "react";
import { Card, CardBody, CardText, CardTitle, CardImg ,Breadcrumb, BreadcrumbItem ,  Modal , ModalBody, ModalHeader , Label , Button,Row, Col} from "reactstrap";
import {Link} from 'react-router-dom';
import {LocalForm , Errors , Control } from 'react-redux-form';
import {Loading } from './LoadingComponent';

  
  function RenderDish({dish}) {
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

  function RenderComments({comments , addComment , dishId}) {
    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((a) => (
              <li key={a.id}>
                <p>{a.comment}</p>
                <p>--{a.author}, {new Intl.DateTimeFormat('en-US', {year : "numeric", month :"short" ,day:'2-digit'}).format(new Date(Date.parse(a.date)))}
                </p>
              </li>
            ))}
          </ul>
          <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
      );
    } else return <div></div>;
  }

  const DishDetail=(props) =>{
    if(props.isLoading ){
      return(
        <div className="container">
          <div className="row">
            <Loading/> 
          </div>
        </div> 
      );
    }
    else if(props.errMess){
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4> 
          </div>
        </div> 
      );
    }
    else if (props.dish != null)
      return (
        <div className="container">
              <div className='row'>
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem> 
              </Breadcrumb> 
              <div className='col-12'>
                <h3>{props.dish.name}</h3>
                <hr/>
              </div>
            </div>

            <div className="row">
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish = {props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments = {props.comments} addComment = {props.addComment} dishId = {props.dish.id }/>
                </div>
            </div>
        </div>
      );
  }


  const maxLength = (len) => (val) => !(val) || (val.length <= len); 
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: false
        };

    }
    toggleModal=()=>{
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleSubmit=(values)=>{
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating , values.yourname , values.comment)
    }

    render() { 
        return ( 
            <div>
                <Button onClick={this.toggleModal} className="bg-white text-secondary">
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name='rating' className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" name="yourname" 
                                        className="form-control" id = "yourname" placeholder ="Your Name"
                                        validators = {{minLength: minLength(3) , maxLength: maxLength(15) }}/>
                                    <Errors className="text-danger" model=".yourname"  show="touched"
                                    messages = {{
                                        minLength : 'Must be greater than 3 characters\n',
                                        maxLength : 'Must be 15 charaters or less'
                                    }}/>  
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model =".comment" name= "comment" id="comment" 
                                    rows='10' className=" form-control"></Control.textarea>
                                </Col>
                            </Row>
                            <Button type='submit' value="submit" color="primary"> Submit </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
            
         );
    }
}



export default DishDetail;
//{ this.renderComments }
