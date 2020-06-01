import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export const noop = () => {};

export const DashboardCard = ({
  heading,
  text,
  buttonText = '',
  onCardClick = noop,
}) => {
  return (
    <Card bg="dark" text="white">
      <Card.Header>{heading}</Card.Header>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      {buttonText && (
        <Button variant="info" onClick={onCardClick}>
          {buttonText}
        </Button>
      )}
    </Card>
  );
};

export const ExpandedStyledDiv = styled.div`
  padding: 16px;
  display: block;
  width: 100%;

  p {
    font-size: 16px;
    font-weight: 700;
    word-break: break-all;
  }
`;

export const getFileUri = (relativePath) =>
  `http://localhost:3200/${relativePath}`;

export const showToastr = (type, ...rest) => {
  toast[type](...rest);
};

export const successErrorHandler = (resolve, reject) => {
  const success = (data, status) => resolve(data);
  const err = (error) => {
    reject && reject(error);
  };
  return {
    success,
    err,
  };
};

export const showToastrError = (errObj) => {
  showToastr(
    'error',
    errObj.error || errObj.err || 'Something went wrong.',
    null,
    {
      timeOut: 0,
      extendedTimeOut: 0,
    }
  );
};
