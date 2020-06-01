import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { getAllOfficer, addNewOfficer } from '../common/actions';
import { showToastr } from '../common/utils';

class Police extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      resetPaginationToggle: false,
      data: [],
      filteredData: [],
    };
    this.fetchData();
  }

  fetchData() {
    getAllOfficer().then((officers) => {
      let refinedList = officers.map((o) => ({
        ...o,
        lastactive: o.lastactive.slice(0, o.lastactive.indexOf('.')),
      }));
      this.setState({
        data: refinedList,
        filteredData: refinedList,
        filterText: '',
      });
    });
  }

  filterItems = (filterText) => {
    let filteredData = this.state.data;
    if (filterText !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    this.setState({
      filterText,
      filteredData,
    });
  };

  columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Last Active',
      selector: 'lastactive',
      sortable: true,
      right: true,
    },
    {
      name: 'Working',
      selector: 'image',
      cell: (d) => (d.status ? 'Yes' : 'No'),
    },
  ];

  handleSubmit = (event) => {
    event.preventDefault();
    let payload = { name: event.target.elements.officerName.value };
    addNewOfficer(payload).then((data) => {
      showToastr('success', data['msg']);
      this.fetchData();
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="cl-sm-4  text-center offset-sm-4">
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group>
                <Form.Control
                  name="officerName"
                  type="text"
                  placeholder="Enter officer name"
                />
                <Form.Text className="text-muted">
                  This name will appear against the cases you're assigned to.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add new officer
              </Button>
            </Form>
          </div>
        </div>
        <DataTable
          title="Active Officers"
          columns={this.columns}
          data={this.state.filteredData}
          highlightOnHover
          defaultSortField="name"
          pagination
          paginationResetDefaultPage={this.state.resetPaginationToggle}
          persistTableHead
        />
      </div>
    );
  }
}

export default Police;
