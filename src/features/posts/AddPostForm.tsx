/*=============================================================================
 AddPostForm.tsx - Add Post Form

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { selectAllUsers } from '../users/usersSlice';
import { unwrapResult }   from '@reduxjs/toolkit';
import { addNewPost }     from './postsSlice';

export const AddPostForm = () => {
  const [title,        setTitle]        = React.useState('');
  const [content,      setContent]      = React.useState('');
  const [userId,       setUserId]       = React.useState('');
  const [addReqStatus, setAddReqStatus] = React.useState('idle');

  const dispatch = useAppDispatch();

  const users = useSelector(selectAllUsers);

  const canSave = [title, content, userId].every(Boolean) && addReqStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddReqStatus('pending');
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddReqStatus('idle');
      }
    }
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={e => setUserId(e.target.value)}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}
