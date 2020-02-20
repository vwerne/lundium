import React, { useState } from 'react';
import { Grid } from 'lundium';
import { filter, o, not, propEq, map, when, assoc } from 'ramda';
import './App.css';

import '@lundium/theme-basic/dist/index.css';
import TodoList from './TodoList';

const App = () => {
	const [items, setItems] = useState([{ name: 'Make app', state: 'completed', id: '1' }]);

	const addItem = item => setItems([...items, item]);

	const deleteItem = id => setItems(filter(o(not, propEq('id', id)), items));

	const completeItem = id =>
		setItems(map(when(propEq('id', id), assoc('state', 'completed')), items));

	return (
		<Grid justifyContent="center">
			<TodoList
				items={items}
				addItem={addItem}
				deleteItem={deleteItem}
				completeItem={completeItem}
			/>
		</Grid>
	);
};

export default App;
