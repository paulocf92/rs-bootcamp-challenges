import React from "react";

const Comment = ({ data: comment }) => (
  <div className="comment">
    <div className="author">
      <img src={comment.author.avatar} alt="Avatar" />
    </div>
    <div className="text">
      <strong>{comment.author.name}</strong> {comment.content}
    </div>
  </div>
);

export default Comment;
