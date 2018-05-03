
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEntityData } from '../actions/api';
import LinkForm from '../components/link-form';
import LinkList from '../components/link-list';


class MainContainer extends Component {
  static propTypes = {
    form: PropTypes.shape({
      linkURL: PropTypes.shape({}),
    }).isRequired,
    link: PropTypes.shape({
      isFetching: PropTypes.bool,
      isSaving: PropTypes.bool,
      models: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        linkURL: PropTypes.string,
        meta: PropTypes.shape({}),
      })),
    }).isRequired,
    createLink: PropTypes.func.isRequired,
  }

  handle() {

  }

  render() {
    const { form, link, createLink } = this.props;

    return (
      <div>
        <LinkForm form={form} onSubmit={createLink} />
        <LinkList link={link} />
      </div>
    );
  }
}

const mapStateToProps = ({
  forms: { linkForm: form },
  entities: { link },
}) => ({
  form,
  link,
});


export default connect(mapStateToProps, {
  createLink: saveEntityData,
})(MainContainer);
