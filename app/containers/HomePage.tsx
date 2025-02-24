import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Home } from '$Components/Home';
import {
    installApp,
    openApp,
    uninstallApp
} from '$Actions/alias_install_actions';
import {
    updateInstallProgress,
    uninstallApplication
} from '$Actions/application_actions';
import { fetchApps } from '$Actions/alias/app_manager_actions';
import { triggerSetStandardWindowVisibility } from '$Actions/alias/launchpad_actions';
import { getUserPreferences } from '$Actions/launchpad_actions';
import { AppState } from '../definitions/application.d';

function mapStateToProperties( state: AppState ) {
    return {
        appManagerState: state.appManager,
        standardWindowIsVisible: state.launchpad.standardWindowIsVisible
    };
}
function mapDispatchToProperties( dispatch ) {
    // until we have a reducer to add here.
    const actions = {
        getUserPreferences,
        installApp,
        openApp,
        uninstallApp,

        updateInstallProgress,
        uninstallApplication,

        fetchApps,

        triggerSetStandardWindowVisibility
    };

    return bindActionCreators( actions, dispatch );
}

export const HomePage: React.ComponentClass = connect(
    mapStateToProperties,
    mapDispatchToProperties
)( Home );
