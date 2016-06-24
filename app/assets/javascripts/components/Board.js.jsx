class Board extends React.Component {
	constructor(props) {
		super(props);
    this.state = {editing: false};
    this.toggleEdit = this.toggleEdit.bind(this);
	}

  toggleEdit() {
    this.setState({editing: !this.state.editing})
  }

  //this is the show function for the board
	render() {
    let info;
    if (this.state.editing){
      info =
        <form  ref='edit'>
          <input type='text' ref='name' placeholder='ListName' required />
          <input type='submit' className='btn' value='Edit' />
        </form>
    } else {
      info =
      <span className="card-title">{this.props.name}</span>
    }

    return(
      <div>
        <div className="col s12 m6" >
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              {info}
              <p>{this.props.description}</p>
            </div>
            <div className="card-action">
              <button className='btn' onClick={this.toggleEdit}>Edit</button>
              <button className='btn red' onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
		)
	}
}