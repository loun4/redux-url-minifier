
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEntityData, saveEntityData } from '../actions/api';
import { authenticate } from '../actions/session';
import Signin from '../components/signin';
import LinkForm from '../components/link-form';
import LinkList from '../components/link-list';

class AdminContainer extends Component {
  static propTypes = {
    session: PropTypes.shape({
      isAuthenticated: PropTypes.bool,
      readyToAuthenticate: PropTypes.bool,
      isFetching: PropTypes.bool,
    }).isRequired,
    link: PropTypes.shape({
      isFetching: PropTypes.bool,
      isSaving: PropTypes.bool,
      models: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        linkURL: PropTypes.string,
        shortURL: PropTypes.string,
      })),
    }).isRequired,
    forms: PropTypes.shape({
      signinForm: PropTypes.shape({}),
      linkForm: PropTypes.shape({}),
    }).isRequired,
    authenticate: PropTypes.func.isRequired,
    fetchEntityData: PropTypes.func.isRequired,
    saveEntityData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.session.readyToAuthenticate) {
      this.props.authenticate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.isAuthenticated && !this.props.session.isAuthenticated) {
      this.props.fetchEntityData({ entity: 'link', auth: true });
    }
  }

  handleLinkCreate = (model) => {
    this.props.saveEntityData({ entity: 'link', model });
  }

  render() {
    const {
      authenticate,
      link,
      forms: { signinForm, linkForm },
      session: { isAuthenticated, isFetching: isSessionFetching, readyToAuthenticate },
    } = this.props;

    if (readyToAuthenticate || isSessionFetching) {
      return null;
    }

    return isAuthenticated ? (
      <div>
        <LinkForm form={linkForm} onSubmit={this.handleLinkCreate} />
        <LinkList link={link} />
      </div>
    ) : (
      <Signin form={signinForm} onSubmit={authenticate} />
    );
  }
}

const mapStateToProps = ({
  forms,
  entities: { link },
  session,
}) => ({
  forms,
  link,
  session,
});

export default connect(mapStateToProps, {
  authenticate,
  fetchEntityData,
  saveEntityData,
})(AdminContainer);
