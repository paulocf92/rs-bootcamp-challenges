import React from "react";

import Comment from "./Comment";

const Post = ({ data: post }) => (
  <div className="post">
    <div className="author">
      <img src={post.author.avatar} alt="Avatar" />
      <div className="details">
        <strong>{post.author.name}</strong>
        <span>{post.date}</span>
      </div>
    </div>
    <p className="content">{post.content}</p>
    <div className="comments">
      {post.comments &&
        post.comments.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
    </div>
  </div>
);

export default Post;
