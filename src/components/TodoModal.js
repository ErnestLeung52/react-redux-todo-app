import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

function TodoModal({ type, modalOpen, setModalOpen }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '') {
      toast.error('Please enter a title.');
      return;
    }

    // console.log('todoModal', title, status);
    // Dispatch actions from addTodo in todoSlice
    if (title && status) {
      if (type === 'Add') {
        dispatch(
          addTodo({
            id: uuid(),
            // title: title, (title from setTitle hook)
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task Added Successfully');
        setModalOpen(false);
      }
      if (type === 'Update') {
        console.log('updating task');
      }
    } else {
      toast.error("Title shoudn't be empty");
    }
  };

  return (
    //   Default modal is false
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Below is the close out button */}
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === 'Update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === 'Update' ? 'Update' : 'Add'} Task
              </Button>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
