import { TYPES } from '$App/actions/launchpad_actions';
import { TYPES as NOTIFICATION_TYPES } from '$Actions/alias/notification_actions';
import { TYPES as ALIAS_TYPES } from '$Actions/alias/launchpad_actions';
import { LaunchpadState, UserPreferences } from '../definitions/application.d';
import { ERRORS, defaultPreferences } from '$Constants/index';

export const initialState: LaunchpadState = {
    shouldOnboard: false,
    userPreferences: { ...defaultPreferences },
    notifications: {},
    notificationCheckBox: false,
    standardWindowIsVisible: true
};

export function launchpadReducer( state = initialState, action ): LaunchpadState {
    const { payload } = action;

    switch ( action.type ) {
        case TYPES.SET_USER_PREFERENCES: {
            const newUserPreferences: UserPreferences = {
                ...state.userPreferences,
                ...payload
            };
            if (
                Object.keys( newUserPreferences ).length !==
                Object.keys( initialState.userPreferences ).length
            ) {
                throw ERRORS.INVALID_PROP;
            }

            return { ...state, userPreferences: newUserPreferences };
        }

        case TYPES.PUSH_NOTIFICATION: {
            const newNotifications = { ...state.notifications };
            if ( !payload.notification || !payload.notification.id )
                throw ERRORS.NOTIFICATION_ID_NOT_FOUND;

            newNotifications[payload.notification.id] = {
                ...payload.notification
            };
            return { ...state, notifications: newNotifications };
        }

        case TYPES.DISMISS_NOTIFICATION: {
            const newNotifications = { ...state.notifications };
            if ( !payload.notificationId ) throw ERRORS.NOTIFICATION_ID_NOT_FOUND;

            delete newNotifications[payload.notificationId];
            return { ...state, notifications: newNotifications };
        }

        case ALIAS_TYPES.ALIAS_SHOULD_ONBOARD: {
            if ( typeof payload.shouldOnboard !== 'boolean' )
                throw ERRORS.INVALID_TYPE;

            return { ...state, shouldOnboard: payload.shouldOnboard };
        }

        case TYPES.SET_STANDARD_WINDOW_VISIBILITY: {
            return { ...state, standardWindowIsVisible: payload };
        }

        case NOTIFICATION_TYPES.NOTIFICATION_TOGGLE_CHECK_BOX: {
            return { ...state, notificationCheckBox: payload };
        }

        case NOTIFICATION_TYPES.ACCEPT_NOTIFICATION:
        case NOTIFICATION_TYPES.DENY_NOTIFICATION:
        default:
            return state;
    }
}
