import React, { Component } from "react";

import Post from "./Post";

import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import profile5 from "../assets/profile5.png";
import profile6 from "../assets/profile6.png";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Daniel Oliveira",
          avatar: profile1
        },
        date: "17 Jul 2019",
        content:
          "Pessoal, alguém conhece alguma empresa com vagas de trainee no ecossistema React?",
        comments: [
          {
            id: 1,
            author: {
              name: "Carlos Ferreira",
              avatar: profile4
            },
            content:
              "Olá! Eu acredito que tenha sim, mas precisa procurar muito por uma vaga que seja satisfeita por um profissional iniciante. Hoje o mercado é bem exigente, mesmo com esses perfis."
          },
          {
            id: 2,
            author: {
              name: "Ana Clara Ribeiro",
              avatar: profile3
            },
            content:
              "Olá! Eu acredito que tenha sim, mas precisa procurar muito por uma vaga que seja satisfeita por um profissional iniciante. Hoje o mercado é bem exigente, mesmo com esses perfis."
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Jefferson Rocha",
          avatar: profile6
        },
        date: "23 Ago 2019",
        content:
          "Alguém tem experiência com trabalhos remotos? Poderiam compartilhar suas experiências?",
        comments: [
          {
            id: 1,
            author: {
              name: "Jaqueline Barbosa",
              avatar: profile2
            },
            content:
              "Pode ser excelente desde que tenha comprometimento aos horários e tarefas exigidas."
          },
          {
            id: 2,
            author: {
              name: "Clarice de Souza",
              avatar: profile5
            },
            content:
              "Como a Jaque disse, pode ser muito bom mas tem que ter comprometimento! É importante se atentar a todos os detalhes envolvidos no trabalho e ter muita dedicação."
          }
        ]
      }
    ]
  };

  render() {
    const { posts } = this.state;
    console.log(posts);

    return (
      <div className="posts">
        {posts && posts.map(post => <Post key={post.id} data={post} />)}
      </div>
    );
  }
}

export default PostList;
