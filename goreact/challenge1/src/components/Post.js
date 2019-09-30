import React from "react";

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
    <div className="comments"></div>
  </div>
);

export default Post;
