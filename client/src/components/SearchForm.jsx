import React, { useCallback } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// I write for readability since code is read 4x more often than it's written.
// This is more readable than the alternative, which would look like this:
//   Array(4).fill().map((_, i) => ({ value: i+1, label: '$'.repeat(i+1) }));
// Since Yelp's price categories are a static value and unlikely to change,
// there is no practical reason to write this programmatically.
const YELP_PRICES = [
  { value: 1, label: '$' },
  { value: 2, label: '$$' },
  { value: 3, label: '$$$' },
  { value: 4, label: '$$$$' },
];

export const SearchForm = ({
  location,
  selectedPrices,
  searchId,
  setLocation,
  setSelectedPrices,
  loadSearch,
  resetSearch,
}) => {
  const onLocationInputChange = useCallback((event) => setLocation(event.target.value), [setLocation]);
  
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    loadSearch(location, selectedPrices);
  }, [location, selectedPrices, loadSearch]);

  const onRefresh = useCallback((event) => {
    event.preventDefault();
    resetSearch(location, selectedPrices, searchId);
  }, [location, selectedPrices, searchId, resetSearch]);

  return (
    <Form onSubmit={onSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={onLocationInputChange}/>
          <Form.Text className="text-muted">For example, '27608' or 'Raleigh, NC'</Form.Text>
        </Form.Group>
        <Form.Group as={Col} controlId="price">
          <Form.Label>Price</Form.Label>
          <Select
            isMulti
            options={YELP_PRICES}
            value={selectedPrices}
            onChange={setSelectedPrices}
            placeholder="Select Price"/>
        </Form.Group>
      </Row>
      <Button type="submit" variant="success" className="me-3">Search</Button>
      <Button type="submit" variant="primary" onClick={onRefresh}>Refresh</Button>
    </Form>
  );
};
