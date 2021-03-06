
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import { updatePostSlice } from '../redux/slices/postsSlice';

const PostDetail = ({ post: { title, body, id, userId }, openSuccess }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [postEdit, setPostEdit] = useState({
        title,
        body,
        id,
        userId
    })
    const dispatch = useDispatch()
    const savePost = () => {
        dispatch(updatePostSlice(postEdit))
        openSuccess(true)
        setIsEditing(false)
    }

    const handleChange = (e) => setPostEdit({ ...postEdit, [e.target.name]: e.target.value })

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center' }} data-testId="post-detail">
            <Card sx={{ maxWidth: 345, alignSelf: 'center' }}>
                <CardContent>
                    {!isEditing ?
                        <>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {body}
                            </Typography> </> :
                        <>
                            <TextField value={postEdit.title} label="Title" name="title" data-testId="title-edit"
                                onChange={handleChange} />
                            <TextField value={postEdit.body} multiline style={{ marginTop: 20, width: '100%' }}
                                label="Body"
                                name="body"
                                onChange={handleChange}
                                data-testId="body-edit"
                            />
                        </>
                    }

                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    {!isEditing ? <Button size="small"
                        startIcon={<Edit />}
                        variant='outlined'
                        style={{ backgroundColor: 'green', color: 'white' }}
                        onClick={() => setIsEditing(true)}
                        data-testId="edit-button"
                    >Edit</Button>
                        : <>
                            <Button style={{ backgroundColor: 'red', color: 'white' }}
                                onClick={() => setIsEditing(false)}>  Cancel</Button>
                            <Button style={{ backgroundColor: 'green', color: 'white' }}
                                startIcon={<Save />}
                                onClick={savePost}
                            >Save</Button>
                        </>
                    }
                </CardActions>
            </Card>
        </div>
    )
}

export default PostDetail
