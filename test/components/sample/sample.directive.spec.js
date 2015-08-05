import assign from 'lodash/object/assign';
import angular from 'angular';
import 'angular-mocks';
import ComponentsModule from '../../../src/components';

describe('SampleDirective', () => {
  let element;
  let parentScope;
  let SampleService;
  let scope;

  // Helpers:

  function _setup(options) {
    const configuration = assign({
      name: 'Default Name',
    }, options);

    if (element) element.remove();

    angular.mock.inject(($compile, $rootScope, _SampleService_) => {
      SampleService = _SampleService_;

      parentScope = $rootScope.$new();
      parentScope.name = configuration.name;

      element = $compile(`<b2io-sample name="{{name}}"></b2io-sample>`)(parentScope);
      parentScope.$digest();

      scope = element.isolateScope();
      scope.$apply();

      angular.element(document.body).append(element);
    });
  }

  function _tearDown() {
    if (element) element.remove();
  }

  // Tests:

  beforeEach(angular.mock.module(ComponentsModule.name));

  beforeEach(() => _setup());

  afterEach(_tearDown);

  it('should compile', () => {
    expect(element).toBeDefined();
  });

  it('should have isolate scope', () => {
    expect(scope).toBeDefined();
  });

  describe('View Model:', () => {
    beforeEach(() => _setup({name: 'A Different Name'}));

    it('should set the title property based on the name', () => {
      expect(scope.title).toEqual('Name: A Different Name');
    });

    it('should set the title contents correctly', () => {
      expect(element.find('.sample__title')).toHaveText('Name: A Different Name');
    });

    describe('#doSomething', () => {
      it('should be wired from the sample CTA', () => {
        spyOn(scope, 'doSomething');

        element.find('.sample__cta').click();

        expect(scope.doSomething).toHaveBeenCalled();
      });

      it('should make a delayedLog call', () => {
        spyOn(SampleService, 'delayedLog');

        scope.doSomething();

        expect(SampleService.delayedLog).toHaveBeenCalledWith('Something!');
      });
    });
  });
});
