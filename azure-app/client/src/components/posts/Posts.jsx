import { useEffect, useState, Fragment } from 'react';

import EditablePost from './EditablePost';
import ReadOnlyPost from './ReadOnlyPost';
import Button from '../common/Button';

const serverUrl = `http://localhost:8080/api/v1/post`;

const Posts = () => {
    const [posts, setPosts] = useState([
        {
            id: '',
            authorId: '',
            title: '',
            text: '',
            isAnonymous: '',
            creadedDate: '',
            updatedDate: '',
        },
    ]);
    const [post, setPost] = useState({
        authorId: '',
        title: '',
        text: '',
        isAnonymous: '',
        creadedDate: '',
        updatedDate: '',
    });

    const [authors, setAuthors] = useState([
        {
            name: '',
            email: '',
            creadedDate: '',
            updatedDate: '',
        },
    ]);

    const [author, setAuthor] = useState({
        name: '',
        email: '',
        creadedDate: '',
        updatedDate: '',
    });

    const [editPostId, setEditPostId] = useState(null);
    const [editAuthorId, setEditAuthorId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        await fetch(serverUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((posts) => {
                setPosts(posts);
            })
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = async (post) => {
        await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((response) => {
                const newPost = { ...post, id: response.insertId };
                setPosts([...Posts, newPost]);
            });
    };

    const handleEditableId = (post) => {
        post ? setEditPostId(post.id) : setEditPostId(post);
    };

    const onSave = async (post) => {
        await fetch(serverUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .finally(() => {
                const newState = Posts.map((e) => {
                    if (e.id === post.id) {
                        return post;
                    }
                    return e;
                });
                setPosts(newState);
            });
    };

    const onDelete = async (id) => {
        await fetch(serverUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(setPosts(posts.filter((post) => post.id !== id)));
    };

    if (loading) return 'Loading...';

    return (
        <div>
            {posts.length !== 0 ? (
                <h2>Recent posts</h2>
            ) : (
                <h4>There are no posts</h4>
            )}
            {posts.map((post) => (
                <Fragment key={post.id}>
                    {editPostId === post.id ? (
                        <EditablePost
                            post={post}
                            handleEditableId={handleEditableId}
                            onSave={onSave}
                        />
                    ) : (
                        <ReadOnlyPost
                            post={post}
                            handleEditableId={handleEditableId}
                            onDelete={onDelete}
                        />
                    )}
                </Fragment>
            ))}
            <hr className="hline" />
            <div>
                <h2>Add new Post</h2>
                <div className="container">
                    <div className="input-container">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            key="name"
                            placeholder="Amazing title"
                            id="title"
                            onChange={handleChange}
                            value={post.title}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Anonymous</label>
                        <input
                            type="checkbox"
                            name="anonymous"
                            key="anonymous"
                            id="anonymous"
                            onChange={handleChange}
                            value={post.isAnonymous}
                        />
                    </div>
                    <div className="input-container">
                        <label>Description</label>
                        <input
                            type="text"
                            name="text"
                            key="text"
                            placeholder="Lorem ipsum ..."
                            id="text"
                            onChange={handleChange}
                            value={post.text}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            key="email"
                            placeholder="lorem@ipsum.com"
                            id="email"
                            onChange={handleChange}
                            value={author.email}
                        />
                    </div>
                    <div className="add-button-container">
                        <Button
                            id="new-Post"
                            text={'Add new'}
                            onClick={() => handleAdd(post)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
