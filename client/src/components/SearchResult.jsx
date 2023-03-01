import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteBurgerJointFromSearch } from '../api';

// Renders the 'Total' string at the top of the results table
const Total = ({ total, burgerJoints }) => {
  let displayTotal;
  if (!total || !burgerJoints.length) {
    displayTotal = 'No Top Burger Joints Found for This Quest';
  } else {
    displayTotal = `Top ${burgerJoints.length} of ${total} Burger Joints`;
  }
  return <div className="fw-bold">{displayTotal}</div>
}

// Renders one individual row in the results table
const BurgerJointRow = ({ searchId, burgerJoint, onDelete }) => {
  const { id: burgerJointId, name, url } = burgerJoint;

  const onClickX = useCallback(() => {
    deleteBurgerJointFromSearch({ searchId, burgerJointId }).then(onDelete);
  }, [searchId, burgerJointId, onDelete]); 

  return (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
      {/* Renders each burger joint name as a link to the restaurant's Yelp page */}
      <a className="ms-2 me-auto" href={url} target="_blank" rel="noreferrer">{name}</a>
      <CloseButton aria-label="Delete" onClick={onClickX}/>
    </ListGroup.Item>
  );
};

export const SearchResult = ({ searchId, total, burgerJoints, onDelete }) => (
  <>
    <Total total={total} burgerJoints={burgerJoints}/>
    <ListGroup numbered>
      {burgerJoints.map(burgerJoint => (
        <BurgerJointRow
          searchId={searchId}
          burgerJoint={burgerJoint}
          key={burgerJoint.id}
          onDelete={onDelete}
        />
      ))}
    </ListGroup>
  </>
);