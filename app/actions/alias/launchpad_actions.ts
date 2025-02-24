import { createAliasedAction } from 'electron-redux';
import { ipcRenderer } from 'electron';

import { UserPreferences } from '$Definitions/application.d';
import {
    storeUserPreferencesLocally,
    checkOnBoardingCompleted,
    autoLaunchOnStart,
    pinLaunchpadToTray
} from '../helpers/launchpad';

export const TYPES = {
    ALIAS_SHOULD_ONBOARD: 'ALIAS_SHOULD_ONBOARD',
    ALIAS_STORE_USER_PREFERENCES: 'ALIAS_STORE_USER_PREFERENCES',
    ALIAS_AUTO_LAUNCH: 'ALIAS_AUTO_LAUNCH',
    ALIAS_PIN_TO_TRAY: 'ALIAS_PIN_TO_TRAY',
    ALIAS_TO_SET_STANDARD_WINDOW_VISIBILITY:
        'ALIAS_TO_SET_STANDARD_WINDOW_VISIBILITY'
};

export const storeUserPreferences = createAliasedAction(
    TYPES.ALIAS_STORE_USER_PREFERENCES,
    ( userPreferences: UserPreferences ) => ( {
        type: TYPES.ALIAS_STORE_USER_PREFERENCES,
        payload: storeUserPreferencesLocally( userPreferences )
    } )
);

export const shouldOnboard = createAliasedAction(
    TYPES.ALIAS_SHOULD_ONBOARD,
    () => ( {
        type: TYPES.ALIAS_SHOULD_ONBOARD,
        payload: checkOnBoardingCompleted().then( ( response: boolean ) => ( {
            shouldOnboard: response
        } ) )
    } )
);

export const autoLaunch = createAliasedAction(
    TYPES.ALIAS_AUTO_LAUNCH,
    ( enable ) => ( {
        type: TYPES.ALIAS_AUTO_LAUNCH,
        payload: autoLaunchOnStart( enable )
    } )
);

export const pinToTray = createAliasedAction(
    TYPES.ALIAS_PIN_TO_TRAY,
    ( enable ) => ( {
        type: TYPES.ALIAS_PIN_TO_TRAY,
        payload: pinLaunchpadToTray( enable )
    } )
);

export const triggerSetStandardWindowVisibility = createAliasedAction(
    TYPES.ALIAS_TO_SET_STANDARD_WINDOW_VISIBILITY,
    ( isVisible: boolean ) => ( {
        type: TYPES.ALIAS_TO_SET_STANDARD_WINDOW_VISIBILITY,
        payload: ( () => {
            ipcRenderer.send( 'set-standard-window-visibility', isVisible );
        } )()
    } )
);
