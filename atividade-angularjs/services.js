"use strict";

angular
  .module("catalogo.servicos", [])
  .factory("DadosCatalogo", function () {
    return {
      faq: [
        {
          title: "Como faço um pedido?",
          body: "Escolha um produto e consulte a disponibilidade.",
        },
        {
          title: "Qual é o prazo de entrega?",
          body: "A entrega leva de três a cinco dias úteis.",
        },
      ],
      tabs: [
        {
          title: "Sobre",
          body: "Catálogo de materiais para estudo.",
        },
        {
          title: "Entrega",
          body: "Enviamos para todo o Brasil.",
        },
      ],
      options: ["Todos", "Papelaria", "Acessórios"],
      products: [
        {
          name: "Caderno",
          price: 24,
          category: "Papelaria",
        },
        {
          name: "Caneta",
          price: 5,
          category: "Papelaria",
        },
        {
          name: "Estojo",
          price: 19,
          category: "Papelaria",
        },
        {
          name: "Agenda",
          price: 32,
          category: "Papelaria",
        },
        {
          name: "Mouse",
          price: 49,
          category: "Acessórios",
        },
        {
          name: "Teclado",
          price: 89,
          category: "Acessórios",
        },
        {
          name: "Suporte",
          price: 39,
          category: "Acessórios",
        },
        {
          name: "Fone",
          price: 59,
          category: "Acessórios",
        },
      ],
    };
  })
  .service("Toast", [
    "$timeout",
    function ($timeout) {
      var estado = this;
      var timer;

      estado.fechar = function () {
        $timeout.cancel(timer);
        estado.mensagem = "";
      };

      estado.mostrar = function (mensagem) {
        estado.fechar();
        estado.mensagem = mensagem;
        timer = $timeout(estado.fechar, 3500);
      };
    },
  ]);
