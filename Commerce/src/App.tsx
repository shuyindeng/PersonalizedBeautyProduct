import React from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import { Rating } from './Rating';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from './products';

interface ProductViewProps {
  products: Product[]
}

interface ProductViewState {
  filter: (product: Product) => boolean,
  sort: (productA: Product, productB: Product) => number
}

class ProductView extends React.Component<ProductViewProps, ProductViewState> {
  constructor(props: ProductViewProps) {
    super(props);
    this.functionFilter = this.functionFilter.bind(this);
    this.goToProduct = this.goToProduct.bind(this);
    this.state = {
      filter: (product: Product) => true,
      sort: (productA: Product, productB: Product) => {
        if(productB.rating === productA.rating) {
          return productB.review - productA.review;
        }
        return productB.rating - productA.rating
      }
    }
  }

  private functionFilter(func: string) {
    this.setState({
      filter: (product: Product) => product.function.has(func)
    });
  }

  private resetFunctionFilter() {
    this.setState({
      filter: (product: Product) => true
    });
  }

  private goToProduct(url: string) {
    window.location.href = url;
  }

  private parseDescription = (descriptStr: string) : string => {
    if (descriptStr == null){
      return descriptStr;
    } else {
      return descriptStr.replaceAll("%2C", ",");
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <ButtonGroup>
                <Button variant="outline-secondary" onClick={e => this.resetFunctionFilter()}>All</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Dry')}>Dry</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Oily')}>Oily</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Combination')}>Combination</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Normal')}>Normal</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Brightening')}>Brightening</Button>
                <Button variant="outline-secondary" onClick={e => this.functionFilter('Anti-aging')}>Anti-aging</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            {this.props.products.filter(this.state.filter).sort(this.state.sort).map(product => 
            <Col style={{display: 'flex', paddingBottom: '20px'}}> 
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.productImageUrl} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: '1.2em'}}>{product.name.replaceAll("%2C", ",")}</Card.Title>
                  <Card.Subtitle>{product.brand} 
                    <div style={{ float: 'right'}}>${product.price}</div>
                  </Card.Subtitle>
                  <Card.Subtitle><Rating score={product.rating} numReviews={product.review} /></Card.Subtitle>
                  <Card.Text style={{ fontSize: '0.9em'}}>
                  {this.parseDescription(product.description)}
                  </Card.Text>
                  <Button className="mt-auto" onClick={e => this.goToProduct(product.productUrl)}>See Details</Button>
                </Card.Body>
              </Card>
            </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProductView;
