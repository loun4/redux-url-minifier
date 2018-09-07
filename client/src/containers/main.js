import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { saveEntityData } from '../actions/api';
import LinkForm from '../components/link-form';
import LinkItem from '../components/link-item';

class Main extends Component {
  static propTypes = {
    linkForm: PropTypes.shape({
      linkURL: PropTypes.shape({}),
    }).isRequired,
    url: PropTypes.string,
    saveEntityData: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    url: null,
  };

  handleLinkCreate = model => {
    this.props.saveEntityData({ entity: 'link', model });
  };

  render() {
    const { linkForm, resetForm, url } = this.props;

    return (
      <div>
        <LinkForm
          form={linkForm}
          onSubmit={this.handleLinkCreate}
          onReset={resetForm}
        />
        {url && <LinkItem url={url} />}
      </div>
    );
  }
}

const mapStateToProps = ({ forms: { linkForm }, entities: { link } }) => ({
  linkForm,
  url: link.models.length > 0 ? [...link.models].shift().shortURL : null,
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
    saveEntityData,
    resetForm: actions.reset,
  },
  mergeProps
)(Main);
