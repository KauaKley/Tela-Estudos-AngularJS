"use strict";

angular
  .module("catalogo", ["catalogo.servicos", "catalogo.diretivas"])
  .filter("reais", function () {
    var moeda = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return function (valor) {
      return moeda.format(valor);
    };
  })
  .controller("CatalogoController", [
    "$scope",
    "DadosCatalogo",
    "Toast",
    function ($scope, dados, toast) {
      $scope.dados = dados;
      $scope.progresso = 35;

      $scope.irPara = function (pagina) {
        $scope.pagina = pagina;
      };

      $scope.filtrar = function (categoria) {
        $scope.categoria = categoria;
        $scope.produtos = dados.products.filter(function (produto) {
          return categoria === "Todos" || produto.category === categoria;
        });
        $scope.total = Math.ceil($scope.produtos.length / 2);
        $scope.irPara(1);
      };

      $scope.salvar = function () {
        toast.mostrar("Preferências salvas na simulação.");
      };

      $scope.filtrar("Todos");
    },
  ]);
