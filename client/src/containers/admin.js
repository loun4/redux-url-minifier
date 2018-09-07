import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
  fetchEntityData,
  removeEntityData,
  saveEntityData,
} from '../actions/api';
import { authenticate } from '../actions/session';
import LinkForm from '../components/link-form';
import LinkList from '../components/link-list';
import Loader from '../components/loader';
import Signin from '../components/signin';

export class Admin extends Component {
  static propTypes = {
    session: PropTypes.shape({
      isAuthenticated: PropTypes.bool,
      readyToAuthenticate: PropTypes.bool,
      isFetching: PropTypes.bool,
    }).isRequired,
    link: PropTypes.shape({
      isFetching: PropTypes.bool,
      isSaving: PropTypes.bool,
      models: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          linkURL: PropTypes.string,
          shortURL: PropTypes.string,
        })
      ),
    }).isRequired,
    forms: PropTypes.shape({
      signinForm: PropTypes.shape({}),
      linkForm: PropTypes.shape({}),
    }).isRequired,
    authenticate: PropTypes.func.isRequired,
    fetchEntityData: PropTypes.func.isRequired,
    saveEntityData: PropTypes.func.isRequired,
    removeEntityData: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.session.isAuthenticated) {
      this.props.fetchEntityData({ entity: 'link', auth: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.session.isAuthenticated &&
      !this.props.session.isAuthenticated
    ) {
      this.props.fetchEntityData({ entity: 'link', auth: true });
    }
  }

  handleLinkCreate = model => {
    this.props.saveEntityData({ entity: 'link', model });
  };

  handleLinkRemove = model => {
    this.props.removeEntityData({ entity: 'link', model });
  };

  render() {
    const {
      authenticate,
      resetForm,
      link,
      forms: { signinForm, linkForm },
      session: {
        isAuthenticated,
        readyToAuthenticate,
        isFetching: isSessionFetching,
      },
    } = this.props;

    if (readyToAuthenticate || isSessionFetching) {
      return <Loader />;
    }

    return isAuthenticated ? (
      <div>
        <LinkForm
          form={linkForm}
          onSubmit={this.handleLinkCreate}
          onReset={resetForm}
        />
        <LinkList link={link} onRemove={this.handleLinkRemove} />
      </div>
    ) : (
      <Signin form={signinForm} onSubmit={authenticate} onReset={resetForm} />
    );
  }
}

const mapStateToProps = ({ forms, entities: { link }, session }) => ({
  forms,
  link,
  session,
});

// Allow dispatchProps to be overriden
// so  props can be mocked & tested
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default connect(
  mapStateToProps,
  {
    authenticate,
    fetchEntityData,
    saveEntityData,
    removeEntityData,
    resetForm: actions.reset,
  },
  mergeProps
)(Admin);
