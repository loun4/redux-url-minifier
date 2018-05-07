
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { saveEntityData } from '../actions/api';
import Loader from '../components/loader';
import LinkForm from '../components/link-form';
import LinkItem from '../components/link-item';


class MainContainer extends Component {
  static propTypes = {
    linkForm: PropTypes.shape({
      linkURL: PropTypes.shape({}),
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
    saveEntityData: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  }

  handleLinkCreate = (model) => {
    this.props.saveEntityData({ entity: 'link', model });
  }

  render() {
    const { linkForm, link, resetForm } = this.props;

    if (link.isFetching) {
      return <Loader />;
    }

    return (
      <div>
        <LinkForm form={linkForm} onSubmit={this.handleLinkCreate} onReset={resetForm} />
        {link.models.length > 0 && (
          <LinkItem url={[...link.models].shift().shortURL} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  forms: { linkForm },
  entities: { link },
}) => ({
  linkForm,
  link,
});


export default connect(mapStateToProps, {
  saveEntityData,
  resetForm: actions.reset,
})(MainContainer);
