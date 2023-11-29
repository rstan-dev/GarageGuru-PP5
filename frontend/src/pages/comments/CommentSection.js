import React, { useState } from 'react';
import { Link  } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import styles from "../../styles/CommentSection.module.css"
import EditCommentForm from './EditCommentForm'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import AddReplyCommentForm from './AddReplyCommentForm';


const CommentSection = (props) => {

    const {
        profile_image,
        profile_id,
        owner,
        updated_at,
        comment_detail,
        setComments,
        id,
        setCommentsCount,
        replies,
    } = props

    const [displayEditForm, setDisplayEditForm] = useState(false)

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const renderReplies = () => {
        return replies.map((reply) => (
            <Card key={reply.reply_id} className={styles.CommentSection}>
                <div className="row">
                    <div className={`col ${styles.ProfileSection}`}>
                        <p className={styles.ProfileName}>
                            {reply.reply_owner}
                        </p>
                        <p className={styles.CommentUpdated}>
                            {reply.reply_updated_at}
                        </p>
                    </div>
                        <div className="col-10">
                            <div className={styles.CommentDetail}>
                            {reply.reply_comment_detail}
                            </div>
                        </div>
                    </div>

            </Card>
        ));
    };

  return (

    <div className={`card ${styles.CommentSection}`}>
            <div className="row">
                <div className={`col ${styles.ProfileSection}`}>
                    <Link to={`/profile/${profile_id}`}>
                    <Image
                        className={styles.ProfileImage}
                        src={profile_image}
                        alt="Profile"
                        fluid
                    />
                    <p className={styles.ProfileName}>
                        {owner}
                    </p>
                    </Link>
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
                            setCommentsCount={setCommentsCount}
                            />
                    </div>
                ) : (
                    <div className="col-10">
                        <div className={styles.CommentDetail}>
                            {comment_detail}
                        </div>
                        {is_owner && !displayEditForm && (
                        <div className="col-12 text-right">
                            <Button
                            onClick={() => setDisplayEditForm(true)}
                            >
                            Edit
                            </Button>
                        </div>
                        )}
                        <div>
                            <div className={styles.ReplyHeader}>Reply to this comment</div>
                            <AddReplyCommentForm
                            id={id}
                            profile_image={profile_image}
                            profile_owner={owner}
                            />
                        </div>
                        <div>
                            {renderReplies()}
                        </div>
                    </div>
                )}


            </div>

    </div>
  )
}

export default CommentSection