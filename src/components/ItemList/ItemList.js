import React, { useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext/ItemsContext'
import firebase from '../../services/firebase'

import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Spinner from '../Spinner/Spinner'

import { getFormattedDate, compareDates } from '../../utils/dateUtils'
import CustomSelect from '../selects/CustomSelect'
import { AuthContext } from '../../contexts/AuthContext/Auth'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	ListWrapper: {
		width: '60rem',
		maxWidth: '100%',
		margin: 10,
	},
}))

// sorting options object for firebase sorting method
const SORT_OPTIONS = {
	EXP_DATE_ASC: { column: 'expDateTimestamp', direction: 'asc' },
	EXP_DATE_DESC: { column: 'expDateTimestamp', direction: 'desc' },
	LABEL_ASC: { column: 'label', direction: 'asc' },
}

export default function ItemList() {
	const classes = useStyles()

	const { items, getItems, deleteItem } = useContext(ItemsContext)
	const { userInfo } = useContext(AuthContext)
	const [sortBy, setSortBy] = useState('EXP_DATE_ASC')
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		const db = firebase.firestore()

		// get list of items based on the store to which the user is attached (from auth context)
		if (userInfo !== null) {
			const unsubscribe = db
				.collection('shopItems')
				.doc(userInfo.shop)
				.collection('items')
				.orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
				.onSnapshot(snapshot => {
					if (snapshot.size) {
						const newItems = snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						}))

						getItems(newItems)
						setLoading(false)
					} else {
						setLoading(false)
					}
				})

			return () => unsubscribe()
		}
		// eslint-disable-next-line
	}, [sortBy, userInfo])

	const getSortOption = option => setSortBy(option)

	return (
		<Paper elevation={2} className={classes.ListWrapper}>
			<>
				<Grid container justify='flex-start'>
					<CustomSelect sortBy={sortBy} getSortOption={getSortOption} />
				</Grid>
				<List className={classes.root}>
					{isLoading ? <Spinner className={classes.Spinner} /> : null}

					{!items.length && !isLoading ? (
						<ListItem>
							<ListItemText secondary={'No items added'} />
						</ListItem>
					) : null}

					{items.map(item => {
						// must contain a color class based on item expDate
						const expWarningClass = compareDates(item.expDateTimestamp)
						return (
							<ListItem
								key={item.id}
								className={`list-item ${expWarningClass}`}
							>
								<ListItemText
									primary={item.label}
									className={`list-item-label ${classes.ItemLabel}`}
								/>
								<div className='list-item__info'>
									<ListItemText
										primary={`Exp date: ${getFormattedDate(
											item.expDateTimestamp
										)}`}
									/>
									<ListItemText primary={`Amount: ${item.amount}`} />
									<ListItemSecondaryAction>
										<IconButton
											edge='end'
											aria-label='comments'
											onClick={deleteItem.bind(this, item.id)}
										>
											<DeleteIcon color='secondary' />
										</IconButton>
									</ListItemSecondaryAction>
								</div>
							</ListItem>
						)
					})}
				</List>
			</>
		</Paper>
	)
}
