import sampleTemplate from './sample.html';

function SampleDirective(SampleService) {
  'ngInject';

  return {
    restrict: 'E',
    template: sampleTemplate,
    scope: {
      name: '@',
    },
    link: function postLink(scope) {
      // Handlers:

      function handleDoSomething() {
        SampleService.delayedLog('Something!');
      }

      // View Model:

      scope.title = `Name: ${scope.name}`;
      scope.doSomething = handleDoSomething;
    },
  };
}

export default SampleDirective;
