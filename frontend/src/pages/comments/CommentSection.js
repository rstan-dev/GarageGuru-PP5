import React, { useState } from 'react'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import styles from "../../styles/CommentSection.module.css"
import EditCommentForm from './EditCommentForm'
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const CommentSection = (props) => {

    const {
        profile_image,
        owner,
        updated_at,
        comment_detail,
        setComments,
        id,
    } = props

    const [displayEditForm, setDisplayEditForm] = useState(false)

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

  return (

    <div className={`card ${styles.CommentSection}`}>
            <div className="row">
                <div className={`col ${styles.ProfileSection}`}>
                    <Image
                        className={styles.ProfileImage}
                        src={profile_image}
                        alt="Profile"
                        fluid
                    />
                    <p className={styles.ProfileName}>
                        {owner}
                    </p>
                    <p className={styles.CommentUpdated}>
                        {updated_at}
                    </p>
                </div>
                {displayEditForm ? (
                    <div className={`col-10 ${styles.CommentDetail}`}>
                            <EditCommentForm
                            id={id}
                            profile_image={profile_image}
                            comment_detail={comment_detail}
                            setDisplayEditForm={setDisplayEditForm}
                            setComments={setComments}
                            />
                    </div>
                ) : (
                    <div className="col-10">
                        <div className={styles.CommentDetail}>
                        {comment_detail}
                        </div>
                    </div>
                )}
                {is_owner && !displayEditForm && (
                    <div className="col-12 text-right">
                        <Button
                        onClick={() => setDisplayEditForm(true)}
                        >
                        Edit
                        </Button>
                    </div>
                )}
            </div>
    </div>
  )
}

export default CommentSection