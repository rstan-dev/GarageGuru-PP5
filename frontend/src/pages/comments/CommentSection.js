import React, { useState } from 'react';
import { Link  } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import styles from "../../styles/CommentSection.module.css"
import EditCommentForm from './EditCommentForm'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import AddReplyCommentForm from './AddReplyCommentForm';
import Accordion from 'react-bootstrap/Accordion';

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
        job,
        setJob,
    } = props

    const [editingId, setEditingId] = useState(null);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const isReplyOwner = currentUser?.username;

    const renderReplies = () => {

        return replies.map((reply) => (

            <Card key={`${id}-${reply.reply_id }`} className={styles.CommentSection}>
                <div className="row">
                    <div className={`col ${styles.ProfileSection}`}>
                        <p className={styles.ProfileName}>
                            {reply.reply_owner}
                        </p>
                        <p className={styles.CommentUpdated}>
                            {reply.reply_updated_at}
                        </p>
                    </div>

                    {editingId === reply.reply_id ? (
                    <div className={`col-10 ${styles.CommentDetail}`}>
                            <EditCommentForm
                            id={reply.reply_id}
                            profile_image={profile_image}
                            comment_detail={reply.reply_comment_detail}
                            isReply={true}
                            parentCommentId={id}
                            setDisplayEditForm={() => setEditingId(null)}
                            setComments={setComments}
                            setCommentsCount={setCommentsCount}
                            />
                    </div>
                    ) : (
                    <div className="col-10">
                        <div className={styles.CommentDetail}>
                            {reply.reply_comment_detail}
                        </div>
                        {(isReplyOwner === reply.reply_owner) && editingId !== reply.reply_id && (
                        <div className="col-12 text-right">
                            <Button
                            onClick={() => setEditingId(reply.reply_id)}
                            >
                            Edit Reply
                            </Button>
                        </div>
                            )}
                    </div>
                    )}
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
                {editingId === id ? (
                    <div className={`col-10 ${styles.CommentDetail}`}>
                            <EditCommentForm
                            id={id}
                            profile_image={profile_image}
                            comment_detail={comment_detail}
                            setDisplayEditForm={() => setEditingId(null)}
                            setComments={setComments}
                            setCommentsCount={setCommentsCount}
                            />
                    </div>
                ) : (
                    <div className="col-10">
                        <div className={styles.CommentDetail}>
                            {comment_detail}
                        </div>
                        {is_owner && editingId !== id && (
                        <div className="col-12 text-right">
                            <Button
                            onClick={() => setEditingId(id)}
                            >
                            Edit Comment
                            </Button>
                        </div>
                        )}
                        <div>
                            <div className={styles.ReplyHeader}>Reply to this comment</div>
                            <AddReplyCommentForm
                            id = {id}
                            jobId={job}
                            profile_image={profile_image}
                            profile_owner={owner}
                            setComments = {setComments}
                            setCommentsCount={setCommentsCount}
                            setJob = {setJob}
                            />
                        </div>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                          {replies.length > 0 ? "Click to view replies" : <span className={styles.NoReplyLink}>No replies yet...</span>}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    {renderReplies()}
                                    </Card.Body>
                                 </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                )}


            </div>

    </div>
  )
}

export default CommentSection