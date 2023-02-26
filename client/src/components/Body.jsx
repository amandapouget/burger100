import React, { useCallback, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { SearchResult } from './SearchResult';
import { SearchForm } from './SearchForm';
import {
  getOrCreateSearch,
  replaceSearchWithRefreshedData,
} from '../api';

const Section = ({ children }) => (
  <Card className="mb-3">
    <Card.Body>{children}</Card.Body>
  </Card>
);

export const Body = () => {
  const [location, setLocation] = useState('');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchId, setSearchId] = useState(null);
  const [burgerJoints, setBurgerJoints] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const setSearch = useCallback((newData) => {
    setSearchId(newData._id || null);
    setBurgerJoints(newData.burgerJoints || []);
    setTotal(newData.total || '');
    setError(newData.error || '');
  }, [setSearchId, setBurgerJoints, setTotal, setError]);

  const loadSearch = useCallback(() => {
    getOrCreateSearch(location, selectedPrices).then(setSearch);
  }, [location, selectedPrices, setSearch]);

  const resetSearch = useCallback(() => {
    replaceSearchWithRefreshedData(location, selectedPrices, searchId)
      .then(setSearch);
  }, [location, selectedPrices, searchId, setSearch]);
  
  return (
    <Container fluid>
      <Section>
        <SearchForm
          location={location}
          selectedPrices={selectedPrices}
          searchId={searchId}
          setLocation={setLocation}
          setSelectedPrices={setSelectedPrices}
          loadSearch={loadSearch}
          resetSearch={resetSearch}
        />
      </Section>

      {error &&
        <Alert variant="danger">{error}</Alert>
      }

      {searchId &&
        <Section>
          <SearchResult
            searchId={searchId}
            total={total}
            burgerJoints={burgerJoints}
            onDelete={loadSearch}
          />
        </Section>
      }
    </Container>
  );
};