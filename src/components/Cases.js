import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { getAllCases, caseCompleted } from '../common/actions';
import { showToastr, getFileUri, ExpandedStyledDiv } from '../common/utils';

const ExpandedCase = ({ data }) => (
  <ExpandedStyledDiv>
    <p>{data.summary}</p>
    <img
      height="75%"
      width="75%"
      alt={data.image}
      src={getFileUri(data.image)}
    />
  </ExpandedStyledDiv>
);

export default class Cases extends React.Component {
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
    getAllCases().then((cases) => {
      let refinedCases = cases.map((c) => ({
        ...c,
        assignedofficer: !!parseInt(c.assignedofficer)
          ? c.assignedofficer
          : 'No officer assigned',
        reportedtime: c.reportedtime.slice(0, c.reportedtime.indexOf('.')),
      }));
      this.setState(
        {
          data: refinedCases,
          filteredData: refinedCases,
          filterText: '',
        },
        () => console.log(this.state.data)
      );
    });
  }

  handleChange = (e) => {
    this.filterItems(e.target.value);
  };

  handleClear = () => {
    if (this.state.filterText) {
      this.setState(
        {
          filterText: '',
          resetPaginationToggle: !this.state.resetPaginationToggle,
        },
        () => {
          this.filterItems(this.state.filterText);
        }
      );
    }
  };

  filterItems = (filterText) => {
    let filteredData = this.state.data;
    if (filterText !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.vehiclenumber &&
          item.vehiclenumber.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    this.setState({
      filterText,
      filteredData,
    });
  };

  columns = [
    {
      name: 'Vehicle Number',
      selector: 'vehiclenumber',
      sortable: true,
    },
    {
      name: 'Assigned Officer',
      selector: 'assignedofficer',
      sortable: true,
      right: true,
    },
    {
      name: 'Reported Time',
      selector: 'reportedtime',
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle Image',
      selector: 'image',
      cell: (d) => (
        <img
          height="32x"
          width="64px"
          alt={d.image}
          src={getFileUri(d.image)}
        />
      ),
      center: true,
    },
    {
      name: 'Action/Status',
      selector: 'image',
      cell: (d) =>
        !d.status ? (
          !!parseInt(d.assignedofficer) ? (
            <Button
              onClick={() => {
                caseCompleted(d).then((o) => {
                  showToastr('success', o.msg);
                  this.fetchData();
                });
              }}
              variant="success"
              type="submit"
            >
              Mark as Resolved
            </Button>
          ) : (
            'Awaiting officer assigment'
          )
        ) : (
          'Case Solved'
        ),
      center: true,
    },
  ];

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-sm-4 offset-sm-8">
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Filter by Vehicle Number"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={this.state.filterText}
                  onChange={this.handleChange}
                />
                <InputGroup.Append>
                  <Button
                    className="button ml-1"
                    variant="danger"
                    onClick={this.handleClear}
                  >
                    X
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </div>
        </div>
        <DataTable
          title="Registered Cases"
          columns={this.columns}
          data={this.state.filteredData}
          expandableRows
          highlightOnHover
          defaultSortField="name"
          expandableRowsComponent={<ExpandedCase />}
          expandOnRowClicked
          pagination
          paginationResetDefaultPage={this.state.resetPaginationToggle}
          persistTableHead
        />
      </div>
    );
  }
}
