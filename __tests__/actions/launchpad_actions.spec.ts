import * as launchpad from '$Actions/launchpad_actions';
import { generateRandomString } from '$Utils/app_utils';

describe( 'Launchpad actions', () => {
    it( 'should have types', () => {
        expect( launchpad.TYPES ).toBeDefined();
    } );

    it( 'should push notification', () => {
        const payload = {
            id: generateRandomString(),
            type: 'UPDATE_AVAILABLE',
            priority: 'HIGH',
            appId: generateRandomString()
        };
        const expectAction = {
            type: launchpad.TYPES.PUSH_NOTIFICATION,
            payload
        };
        expect( launchpad.pushNotification( payload ) ).toEqual( expectAction );
    } );

    it( 'should dismiss notification', () => {
        const payload = {
            notificationId: generateRandomString()
        };
        const expectAction = {
            type: launchpad.TYPES.DISMISS_NOTIFICATION,
            payload
        };
        expect( launchpad.dismissNotification( payload ) ).toEqual( expectAction );
    } );

    it( 'should set user preferences', () => {
        const payload = {
            userPreferences: {
                autoUpdate: true,
                pinToMenuBar: true,
                launchOnStart: true,
                showDeveloperApps: true,
                warnOnAccessingClearnet: true
            }
        };
        const expectAction = {
            type: launchpad.TYPES.SET_USER_PREFERENCES,
            payload
        };
        expect( launchpad.setUserPreferences( payload ) ).toEqual( expectAction );
    } );

    it( 'should create action to indicate window visibility', () => {
        const payload = {
            isVisible: true
        };
        const expectAction = {
            type: launchpad.TYPES.SET_STANDARD_WINDOW_VISIBILITY,
            payload
        };
        expect( launchpad.setStandardWindowVisibility( payload ) ).toEqual(
            expectAction
        );
    } );
} );
