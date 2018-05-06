
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEntityData } from '../actions/api';
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
  }

  handleLinkCreate = (model) => {
    this.props.saveEntityData({ entity: 'link', model });
  }

  render() {
    const { linkForm, link } = this.props;

    return (
      <div>
        <LinkForm form={linkForm} onSubmit={this.handleLinkCreate} />
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
})(MainContainer);
