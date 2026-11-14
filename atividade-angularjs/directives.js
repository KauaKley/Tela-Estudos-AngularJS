"use strict";

angular
  .module("catalogo.diretivas", ["catalogo.servicos"])
  .directive("faqList", function () {
    return {
      scope: { items: "<" },
      template: `
        <div class="faq-item" ng-repeat="item in items">
          <button type="button" ng-click="alternar($index)" ng-attr-aria-expanded="{{ aberto === $index }}">{{ item.title }}</button>
          <div class="fold" ng-class="{open: aberto === $index}"><div><p>{{ item.body }}</p></div></div>
        </div>`,
      link: function (scope) {
        scope.aberto = -1;
        scope.alternar = function (indice) {
          scope.aberto = scope.aberto === indice ? -1 : indice;
        };
      },
    };
  })
  .directive("pageNav", function () {
    return {
      scope: { current: "<", total: "<", onChange: "&" },
      template: `
        <nav class="actions" aria-label="Páginas dos produtos">
          <button type="button" ng-disabled="current <= 1" ng-click="onChange({page: current - 1})">Anterior</button>
          <button type="button" ng-repeat="page in pages" ng-class="{active: page === current}"
            ng-attr-aria-current="{{ page === current ? 'page' : 'false' }}" ng-click="onChange({page: page})">{{ page }}</button>
          <button type="button" ng-disabled="current >= total" ng-click="onChange({page: current + 1})">Próxima</button>
        </nav>`,
      link: function (scope) {
        scope.$watch("total", function (total) {
          scope.pages = Array.from({ length: total }, function (_, index) {
            return index + 1;
          });
        });
      },
    };
  })
  .directive("uploadProgress", function () {
    return {
      scope: { value: "<" },
      template:
        '<progress max="100" value="{{ value }}" aria-label="Progresso do envio"></progress><span>{{ value }}%</span>',
    };
  })
  .directive("infoTabs", function () {
    return {
      scope: { items: "<" },
      template: `
        <div class="actions">
          <button type="button" ng-repeat="item in items" ng-class="{active: ativa === $index}"
            ng-attr-aria-pressed="{{ ativa === $index }}" ng-click="selecionar($index)">{{ item.title }}</button>
        </div>
        <p>{{ items[ativa].body }}</p>`,
      link: function (scope) {
        scope.ativa = 0;
        scope.selecionar = function (indice) {
          scope.ativa = indice;
        };
      },
    };
  })
  .directive("categoryMenu", [
    "$document",
    function ($document) {
      return {
        scope: { options: "<", onSelect: "&" },
        template: `
        <div class="dropdown">
          <button type="button" ng-click="aberto = !aberto" ng-attr-aria-expanded="{{ aberto }}">Escolher categoria</button>
          <div class="options" ng-if="aberto">
            <button type="button" ng-repeat="option in options" ng-click="selecionar(option)">{{ option }}</button>
          </div>
        </div>`,
        link: function (scope, element) {
          scope.aberto = false;
          scope.selecionar = function (option) {
            scope.aberto = false;
            scope.onSelect({ option: option });
          };
          function fecharFora(evento) {
            if (scope.aberto && !element[0].contains(evento.target)) {
              scope.$evalAsync(function () {
                scope.aberto = false;
              });
            }
          }
          $document.on("click", fecharFora);
          scope.$on("$destroy", function () {
            $document.off("click", fecharFora);
          });
        },
      };
    },
  ])
  .directive("appToast", [
    "Toast",
    function (toast) {
      return {
        scope: {},
        template: `
        <div class="toast" ng-if="toast.mensagem">
          <span role="status">{{ toast.mensagem }}</span>
          <button type="button" ng-click="toast.fechar()">Fechar</button>
        </div>`,
        link: function (scope) {
          scope.toast = toast;
        },
      };
    },
  ]);
