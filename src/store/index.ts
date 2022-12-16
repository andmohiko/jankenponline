import Vue from 'vue'
import Vuex from 'vuex'

import { Match } from '~/entities/Match'
import { User } from '~/entities/User'

Vue.use(Vuex)

export interface State {
  user: User | null
  currentMatch: Match | null
}

export const state = (): State => ({
  user: null,
  currentMatch: null,
})

export const mutations = {
  setUser(state: State, user: User) {
    state.user = user
  },
  setCurrentMatch(state: State, match: Match) {
    state.currentMatch = match
  },
}

export const actions = {}

export const getters = {}
