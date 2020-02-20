import React, { useState } from 'react';
import { Box, Button, Grid, Heading, Radio } from 'lundium';
import { map, o, propEq, filter, curry } from 'ramda';
import ListItem from './ListItem';

const filterItems = curry((filterItem, items) =>
	filterItem ? filter(propEq('state', filterItem))(items) : items
);

const TodoList = ({ items, addItem, deleteItem, completeItem }) => {
	const [filterItem, setFilter] = useState(null);
	const [inputValue, setInputValue] = useState(null);

	const handleSubmit = event => {
		event.preventDefault();
		addItem({ name: inputValue, state: 'active', id: items.length + 1 });
		setInputValue('');
	};

	return (
		<Box className="content-inner mt-1 todos">
			<Heading>Todo App</Heading>
			<Grid className="content-box">
				<Grid>
					<form onSubmit={handleSubmit}>
						<Grid row>
							<input
								name="todo"
								type="input"
								className="ml-3 mr-1"
								placeholder="Enter new todo"
								value={inputValue}
								onChange={event => setInputValue(event.target.value)}
							/>
							<Button kind="info" size="xs" type="submit">
								Add
							</Button>
						</Grid>
					</form>
					<Grid row className="mt-2 mb-2">
						<Grid col="4">
							<Radio
								id="all"
								label="All"
								name="all"
								onChange={() => setFilter(null)}
								checked={filterItem === null}
							/>
						</Grid>
						<Grid col="4">
							<Radio
								id="active"
								label="Active"
								name="active"
								onChange={event => setFilter(event.target.id)}
								checked={filterItem === 'active'}
							/>
						</Grid>
						<Grid col="4">
							<Radio
								id="completed"
								label="Completed"
								name="completed"
								onChange={event => setFilter(event.target.id)}
								checked={filterItem === 'completed'}
							/>
						</Grid>
					</Grid>
					<ul className="px-0">
						{o(
							map(item => (
								<ListItem
									key={item.id}
									item={item}
									deleteItem={deleteItem}
									completeItem={completeItem}
								/>
							)),
							filterItems(filterItem)
						)(items)}
					</ul>
				</Grid>
			</Grid>
		</Box>
	);
};

export default TodoList;
