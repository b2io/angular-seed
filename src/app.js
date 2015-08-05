import angular from 'angular';
import ComponentsModule from './components';
import ServicesModule from './services';

angular.module('b2io.angular-seed',
  [
    ComponentsModule.name,
    ServicesModule.name,
  ]);
