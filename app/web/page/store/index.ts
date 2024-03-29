'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import RootState from './state';

Vue.use(Vuex);

export default function createStore(initState: any = {}) {
  const { title, url, origin, locale, csrf, user } = initState;
  const state = { title, url, origin, locale, csrf, user };
  return new Vuex.Store<RootState>({
    state,
    modules: {
      
    }
  });
}