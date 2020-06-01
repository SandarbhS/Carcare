import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { DashboardCard, showToastr } from '../common/utils';
import { getAllCases, getAllOfficer, addNewCase } from '../common/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCases: 0,
      totalOfficers: 0,
      casesSolved: 0,
      showDashboard: true,
    };
    this.getData();
  }
  getData() {
    getAllCases().then((cases) => {
      getAllOfficer().then((officers) => {
        let solvedCases = 0;
        cases.forEach((o) => {
          if (o.status) {
            solvedCases++;
          }
        });
        this.setState({
          totalCases: cases.length,
          totalOfficers: officers.length,
          casesSolved: solvedCases,
        });
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('myFile', event.target.file.files[0]);
    data.append('vehicleNumber', event.target.elements.vehicleNumber.value);
    addNewCase(data)
      .then((data) => {
        showToastr('success', data['msg']);
        this.navigateTo('/cases');
      })
      .catch((err) => {
        showToastr('danger', 'Some error occured while connecting to server.');
      });
  };

  navigateTo = (path) => {
    this.props.history.push(path);
  };

  render() {
    const { showDashboard } = this.state;
    return (
      <div className="container-fluid text-center">
        <h1 className="mt-5">Welcome to CarCare</h1>
        <h4>Keep your cars safe with us</h4>
        {showDashboard ? (
          <div className="row mt-5">
            <div className="col-sm-4 py-1">
              <DashboardCard
                heading="Total cases registered"
                text={this.state.totalCases}
                buttonText="Report a vehicle"
                onCardClick={() => this.setState({ showDashboard: false })}
              />
            </div>
            <div className="col-sm-4 py-1">
              <DashboardCard
                heading="Cases Solved"
                text={this.state.casesSolved}
                buttonText="Check active cases"
                onCardClick={() => this.navigateTo('/cases')}
              />
            </div>
            <div className="col-sm-4 py-1">
              <DashboardCard
                heading="Officers at work"
                text={this.state.totalOfficers}
                buttonText="Check Status"
                onCardClick={() => this.navigateTo('/police')}
              />
            </div>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-sm-4 offset-sm-4">
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter vehicle number"
                    name="vehicleNumber"
                    required
                  />
                  <Form.Text className="text-muted">
                    Your privacy, is our priority. Be assured.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.File
                    name="file"
                    id="custom-file"
                    label="Vehicle Image"
                    data-browse="Upload"
                    custom
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Report vehicle
                </Button>
                <Button
                  className="button ml-5"
                  variant="info"
                  onClick={() => this.setState({ showDashboard: true })}
                >
                  Back to Dashboard
                </Button>
              </Form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
