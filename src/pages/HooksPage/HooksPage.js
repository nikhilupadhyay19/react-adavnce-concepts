import React, { useState, useEffect } from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';

const HooksPage = () => {
  const [content, setContent] = useState('posts');
  const [data, setData] = useState([]);
  console.log(data, `${content}..........`);

  useEffect(() => {
    console.log('1. componentDidMount...');
  }, []);

  useEffect(() => {
    console.log('2. componentDidUpdate...');
    fetch(`https://jsonplaceholder.typicode.com/${content}`)
      .then((response) => response.json())
      .then((json) => setData(json));

    return () => {
      console.log('3. componentWillUnmount...');
    };
  }, [content]);

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <ButtonToolbar>
            <ButtonGroup className="me-2">
              <Button color="primary" onClick={() => setContent('posts')}>
                Posts
              </Button>
              <Button color="primary" onClick={() => setContent('comments')}>
                Comments
              </Button>
              <Button color="primary" onClick={() => setContent('albums')}>
                Albums
              </Button>
              <Button color="primary" onClick={() => setContent('photos')}>
                Photos
              </Button>
              <Button color="primary" onClick={() => setContent('todos')}>
                Todos
              </Button>
              <Button color="primary" onClick={() => setContent('users')}>
                Users
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
        <Col lg={12}>
          <h2>{content}</h2>
          <p>{JSON.stringify(data)}</p>
        </Col>
      </Row>
    </Container>
  );
};

export { HooksPage };
