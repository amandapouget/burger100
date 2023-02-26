import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteBurgerJointFromSearch } from '../api';

const Total = ({ total }) => {
  let displayTotal;
  if (!total) {
    displayTotal = 'No Burger Joints Found for This Quest';
  } else if (total >= 100) {
    displayTotal = `Top 100 of ${total} Burger Joints`;
  } else {
    displayTotal = `Top ${total} Burger Joints`;
  }
  return <div className="fw-bold">{displayTotal}</div>
}

const BurgerJointRow = ({ searchId, burgerJoint, onDelete }) => {
  const { id: burgerJointId, name } = burgerJoint;

  const onClose = useCallback(() => {
    deleteBurgerJointFromSearch(searchId, burgerJointId).then(onDelete);
  }, [searchId, burgerJointId, onDelete]); 

  return (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">{name}</div>
      <CloseButton aria-label="Delete" onClick={onClose}/>
    </ListGroup.Item>
  );
};

export const SearchResult = ({ searchId, total, burgerJoints, onDelete }) => (
  <>
    <Total total={total}/>
    <ListGroup as="ol" numbered>
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