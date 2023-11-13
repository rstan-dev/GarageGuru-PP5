import React from 'react'
import Row from 'react-bootstrap/Row'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import styles from "../../styles/Comment.module.css"

const CommentSection = (props) => {

    const {
        profile_image,
        owner,
        updated_at,
        comment_detail,
    } = props

  return (
    <>
    <div className={`card ${styles.CommentSection}`}>
            <div className="row ${styles.CommentSection">
                <div className="col-3">
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

                <div className={`col-9 ${styles.CommentDetail}`}>
                    <div className={styles.CommentDetail}>
                            {comment_detail}
                    </div>
                </div>
            </div>
    </div>


    </>


  )
}

export default CommentSection