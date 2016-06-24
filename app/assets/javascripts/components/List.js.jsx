class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [] }; 
	}

	componentWillMount() {
		// TODO: make ajax call to grab all the lists items
		// on success - set state of all the items
	}

	addList(e) {
		e.preventDefault();
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'POST',
			data: { list: { name: this.refs.name.value } },
			dataType: 'JSON'
		}).done( list => {
			this.refs.addList.reset();
			this.setState({ lists: [{...list}, ...this.state.lists ] });
		}).fail( data => {
			// TODO: Handle this better
			alert('List not saved.');
		});
	}


	render() {
		let items = this.state.items.map( item => {
			// TODO: This should be a new Item component
			return(<h3>{item.name}</h3>)
		});
		return(
			<div>
			  <h3>{this.props.name}</h3>
			  <button className='btn'>Add Item</button>
			  <button className='btn'>Edit List</button>
			  <button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete List</button>
			  <hr />
			  {lists}
			</div>
		);
	}
}