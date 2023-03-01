import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteBurgerJointFromSearch } from '../api';

const Total = ({ total, burgerJoints }) => {
  let displayTotal;
  if (!total || !burgerJoints.length) {
    displayTotal = 'No Top Burger Joints Found for This Quest';
  } else {
    displayTotal = `Top ${burgerJoints.length} of ${total} Burger Joints`;
  }
  return <div className="fw-bold">{displayTotal}</div>
}

const BurgerJointRow = ({ searchId, burgerJoint, onDelete }) => {
  const { id: burgerJointId, name, url } = burgerJoint;

  const onClose = useCallback(() => {
    deleteBurgerJointFromSearch({ searchId, burgerJointId }).then(onDelete);
  }, [searchId, burgerJointId, onDelete]); 

  return (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
      <a className="ms-2 me-auto" href={url} target="_blank" rel="noreferrer">{name}</a>
      <CloseButton aria-label="Delete" onClick={onClose}/>
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