import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import auth from '../../Auth/auth-helper'
import {remove} from './../../Property/api-property'


export default function DeleteProperty(props) {
    const [open, setOpen] = useState(false)

    const jwt = auth.isAuthenticated()

    const clickButton = () => {
        setOpen(true)
    }

    const deleteProperty = () => {
        remove({
            userId: props.userId,
            propertyId: props.propertyId
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOpen(false)
                props.onRemove(props.values)
            }
        })
    }

    const handleRequestClose = () => {
        setOpen(false)
    }
    return (
        <>
           <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete "+props.values.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your {props.values.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteProperty} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span> 
        </>
    )
}

DeleteProperty.propTypes = {
    shopId: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }
  
