// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {savePreferences} from 'mattermost-redux/actions/preferences';
import {makeGetCategory} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentUser, isCurrentUserSystemAdmin} from 'mattermost-redux/selectors/entities/users';

import {setShowNextStepsView} from 'actions/views/next_steps';
import {GlobalState} from 'types/store';
import {Preferences} from 'utils/constants';

import {getSteps} from './steps';

import NextStepsView from './next_steps_view';

function makeMapStateToProps() {
    const getCategory = makeGetCategory();

    return (state: GlobalState) => {
        return {
            currentUser: getCurrentUser(state),
            isAdmin: isCurrentUserSystemAdmin(state),
            preferences: getCategory(state, Preferences.RECOMMENDED_NEXT_STEPS),
            steps: getSteps(state),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
            setShowNextStepsView,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(NextStepsView);
