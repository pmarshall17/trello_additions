class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {boards: props.boards, show: false};
		this.deleteBoard = this.deleteBoard.bind(this);
		this.showBoard = this.showBoard.bind(this);
	}

	showBoard(board) {
		this.setState({ show: true, board })
	}

	addBoard(board) {
		this.setState({ boards: [{...board}, ...this.state.boards] });
	}

	deleteBoard(id) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let boards = this.state.boards;
			let index = boards.findIndex( b => b.id === id);
			this.setState({
				boards: [
				  ...boards.slice(0, index),
				  ...boards.slice(index + 1, boards.length)
				]
			});
		}).fail( data => {
			// TODO: handle this better!
			alert('Board did not delete.');
		});
	}

	boardBack() {
		this.setState({ show: false });
	}

	render() {
		if(this.state.show) {
			// render the show html
			let board = this.state.board;
			return(
				<div>
				  <h3>{board.name}</h3>
				  <i>{board.description}</i>
				  <button className='btn' onClick={this.boardBack.bind(this)}>Back</button>
				  <hr />
				  <Lists boardId={board.id} />
				</div>
			)
		} else {
			let boards = this.state.boards.map( board => {
				return(<Board key={`board-${board.id}`} {...board} deleteBoard={this.deleteBoard} showBoard={this.showBoard} />);
			});

			return(
				<div>
				  <NewBoard addBoard={this.addBoard.bind(this)} />
				  <div className='row'>
				    {boards}
				  </div>
				</div>
			)
		}
	}
}