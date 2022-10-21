import { useState } from 'react';

import Button from '../common/Button';

const EditablePost = ({ post, handleEditableId, onSave }) => {
    const [newPost, setNewPost] = useState(post);

    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="post">
                <div className="text-container">
                    <div>Title</div>
                    <input
                        type="text"
                        name="name"
                        value={newPost.name}
                        onChange={handleChange}
                    />
                    <div>Text</div>
                    <div className="datetime-container">
                        <input
                            type="text"
                            name="date"
                            value={newPost.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="action-container">
                    <Button
                        id="cancel"
                        text={'Cancel'}
                        onClick={() => {
                            handleEditableId(null);
                        }}
                        onChange={handleChange}
                    />
                    <Button
                        id="save"
                        text={'Save'}
                        onClick={() => {
                            handleEditableId(null);
                            onSave(newPost);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditablePost;
