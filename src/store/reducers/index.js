import { combineReducers } from "redux";
import { reducer as driver } from "@podlove/player-state/driver";
import { reducer as show } from "@podlove/player-state/show";
import { reducer as media } from "@podlove/player-state/media";
import { reducer as timepiece } from "@podlove/player-state/timepiece";
import { reducer as episode } from "@podlove/player-state/episode";
import { reducer as audio } from "@podlove/player-state/audio";
import { reducer as network } from "@podlove/player-state/network";
import { reducer as ghost } from '@podlove/player-state/ghost'
import { reducer as chapters } from '@podlove/player-state/chapters'
import { reducer as quantiles } from '@podlove/player-state/quantiles'
import { setVolume } from '@podlove/player-actions/audio'
import { setRate } from '@podlove/player-actions/audio'

import selectors from "./selectors";

import * as action from "./action";
import * as episodes from "./episodes";
import * as player from "./player";
import * as playbar from "./playbar";

const reducers = combineReducers({
  action: action.reducer,
  episodes: episodes.reducer,
  player: combineReducers({ quantiles, chapters, ghost, network, driver, show, media, timepiece, episode, audio, current: player.reducer }),
  playbar: playbar.reducer
});

const actions = {
  ...episodes.actions,
  ...player.actions,
  ...playbar.actions,
  setVolume,
  setRate
};

export { selectors, actions, reducers };
