
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import LinkItem from './link-item';

const COLUMNS = [{
  Header: 'Short URL',
  accessor: 'shortURL',
  Cell: row => <LinkItem url={row.value} className="mini" />,
}, {
  Header: 'Long URL',
  accessor: 'linkURL',
  minWidth: 100,
}, {
  Header: 'Created at',
  accessor: 'createdAt',
  Cell: row => new Date(row.value).toLocaleDateString(),
  minWidth: 25,
}, {
  Header: 'Visits',
  accessor: 'visit',
  minWidth: 15,
}, {
  Cell: () => <button className="negative ui button mini">Delete</button>,
  minWidth: 30,
  className: 'rt-delete',
  sortable: false,
}];


export default class LinkList extends Component {
  static propTypes = {
    link: PropTypes.shape({
      isFetching: PropTypes.bool,
      isSaving: PropTypes.bool,
      models: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        linkURL: PropTypes.string,
        shortURL: PropTypes.string,
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
        defaultSorted={[{ id: 'createdAt', desc: true }]}
      />
    );
  }
}
