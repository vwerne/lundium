import React from 'react';
import { Button, Text, Grid, Icon } from 'lundium';
import { cx } from 'ramda-extension';

const ListItem = ({ item: { name, id, state }, deleteItem, completeItem }) => (
	<li className="item mt-2">
		<Grid row className="flex-nowrap">
			<Grid col="10" className={cx('text ml-3', { completed: state === 'completed' })}>
				<Text className="mt-2">{name}</Text>
			</Grid>
			{state !== 'completed' && (
				<Grid col="1" className="mt-2 mr-0">
					<Button kind="teal" size="xs" onClick={() => completeItem(id)}>
						<Icon className="ml-1" type="rejected" />
					</Button>
				</Grid>
			)}
			<Grid col="1" className="mt-2 ml-0">
				<Button kind="warning" size="xs" onClick={() => deleteItem(id)}>
					<Icon className="ml-1" type="delete" />
				</Button>
			</Grid>
		</Grid>
	</li>
);

export default ListItem;
