
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const COLUMNS = [{
  Header: 'Short URL',
  accessor: 'id',
}, {
  Header: 'URL',
  accessor: 'linkURL',
}, {
  Header: 'Created at',
  id: 'created',
  accessor: ({ meta: { created } }) => created,
}, {
  Header: 'Visits',
  accessor: 'visit',
}];


export default class LinkList extends Component {
  static propTypes = {
    link: PropTypes.shape({
      isFetching: PropTypes.bool,
      isSaving: PropTypes.bool,
      models: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        linkURL: PropTypes.string,
        meta: PropTypes.shape({}),
      })),
    }).isRequired,
  }

  handleDelete() {

  }

  render() {
    const { link: { models } } = this.props;

    return (
      <ReactTable
        data={models}
        columns={COLUMNS}
        minRows={0}
        noDataText="No links found"
      />
    );
  }
}
