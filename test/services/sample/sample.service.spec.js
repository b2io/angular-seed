import angular from 'angular';
import 'angular-mocks';
import ServicesModule from '../../../src/services';

describe('SampleService', () => {
  let $log;
  let $timeout;
  let SampleService;

  // Helpers:

  function _setup() {
    angular.mock.module(($provide) => {
      $provide.decorator('$timeout', ($delegate) => {
        return jasmine.createSpy('$timeout', $delegate).and.callThrough();
      });
    });

    angular.mock.inject((_$log_, _$timeout_, _SampleService_) => {
      $log = _$log_;
      $timeout = _$timeout_;
      SampleService = _SampleService_;
    });
  }

  // Tests:

  beforeEach(angular.mock.module(ServicesModule.name));

  beforeEach(() => _setup());

  it('should exist', () => {
    expect(SampleService).toBeDefined();
  });

  describe('.delayedLog', () => {
    it('should make use of $timeout', () => {
      SampleService.delayedLog('test');

      expect($timeout).toHaveBeenCalledWith(jasmine.any(Function), 1000);
    });

    it('should log after the specified time', () => {
      spyOn($log, 'info');

      SampleService.delayedLog('test');
      $timeout.flush();

      expect($log.info).toHaveBeenCalledWith('Delayed Log: test');
    });
  });
});
