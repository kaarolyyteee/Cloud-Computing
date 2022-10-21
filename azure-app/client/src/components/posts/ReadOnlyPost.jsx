import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';

const ReadOnlyPost = ({ post, handleEditableId, onDelete }) => {

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="post">
                <div className="text-container">
                    <h3>{post.title}</h3>
                    <h2>{post.createdDate}</h2>
                    {post.text}
                </div>
                <div className="action-container">
                    <Button
                        id="delete"
                        text={'Delete'}
                        onClick={() => onDelete(post.id)}
                    />
                    <Button
                        id="update"
                        text="Edit"
                        onClick={(e) => handleEditableId(post)}
                    />
                    {/* <Button
                        id="view"
                        text={'View'}
                        onClick={() => {
                            navigate(`/${post.id}/posts`, { state: post });
                        }}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default ReadOnlyPost;
