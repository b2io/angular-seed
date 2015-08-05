import angular from 'angular';
import SampleDirective from './sample/sample.directive';
import ServicesModule from '../services';

const ComponentsModule = angular.module('b2io.angular-seed.components',
  [
    ServicesModule.name,
  ])
  .directive('b2ioSample', SampleDirective);

export default ComponentsModule;
