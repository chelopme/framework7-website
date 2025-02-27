/**
 * Framework7 8.0.0
 * Full featured mobile HTML framework for building iOS & Android apps
 * https://framework7.io/
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 3, 2023
 */

import $ from './shared/dom7.js';
import Framework7 from './components/app/app-class.js';
import * as utils from './shared/utils.js';
import { getSupport } from './shared/get-support.js';
import { getDevice } from './shared/get-device.js';
import DeviceModule from './modules/device/device.js';
import SupportModule from './modules/support/support.js';
import UtilsModule from './modules/utils/utils.js';
import ResizeModule from './modules/resize/resize.js';
import TouchModule from './modules/touch/touch.js';
import ClicksModule from './modules/clicks/clicks.js';
import RouterModule from './modules/router/router.js';
import RouterComponentLoaderModule from './modules/router/component-loader.js';
import ComponentModule, { Component, $jsx } from './modules/component/component.js';
import HistoryModule from './modules/history/history.js';
import ServiceWorkerModule from './modules/service-worker/service-worker.js';
import StoreModule, { createStore } from './modules/store/store.js';
import Statusbar from './components/statusbar/statusbar.js';
import View from './components/view/view.js';
import Navbar from './components/navbar/navbar.js';
import Toolbar from './components/toolbar/toolbar.js';
import Subnavbar from './components/subnavbar/subnavbar.js';
import TouchRipple from './components/touch-ripple/touch-ripple.js';
import Modal from './components/modal/modal.js';
import Router from './modules/router/router-class.js';
Router.use([RouterComponentLoaderModule]);
Framework7.use([DeviceModule, SupportModule, UtilsModule, ResizeModule, TouchModule, ClicksModule, RouterModule, HistoryModule, ComponentModule, ServiceWorkerModule, StoreModule, Statusbar, View, Navbar, Toolbar, Subnavbar, TouchRipple, Modal]);
export { Component, $jsx, $ as Dom7, utils, getDevice, getSupport, createStore };
export default Framework7;
