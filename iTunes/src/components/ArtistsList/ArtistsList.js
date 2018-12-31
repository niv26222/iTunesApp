import React, {Fragment} from "react";
import {Button, ListGroup, ListGroupItem, Input, Container} from 'reactstrap';
import Loader from '../Loader/Loader';
import './ArtistsList.scss'

const ArtistsList = props => {
  const localArtists = JSON.parse(localStorage.getItem("artists"));
  const {value, Artists, onInputChange, loaded, onAddNewArtist, onOpenModal} = props;
  return (
    <Container>
      <br/>
      <Fragment>
        {loaded ? (
          <div className="search-list">
            <div className="search-box">
              <div className="search-item">
                <Input
                  type="text"
                  placeholder="search.."
                  value={value}
                  onChange={({target}) => onInputChange(target.value)}
                />
                <Button outline color="success" onClick={({target}) => onAddNewArtist(target.value)}>SUBMIT</Button>
              </div>
            </div>
            <div>TOP 10 History:</div>
            <div className="search-box">
              {localArtists ? localArtists.map((artist, i) => <p key={i}>{artist}</p>) : <p>not yet received</p>}
            </div>

            <ListGroup>
              {Artists.length ? Artists.map((Artist, index) => {

                return <ListGroupItem key={index} className="text-center" onClick={() => {
                  onOpenModal(Artist)
                }}>
                  <img src={Artist.artworkUrl60} alt=""/>
                  <p>{Artist.artistName} </p>
                  <p>{Artist.collectionCensoredName} </p>

                </ListGroupItem>
              }) : <h2>First time here? :) <br/> Find your favorite song</h2>
              }
            </ListGroup>

          </div>
        ) : <Loader/>}
      </Fragment>
    </Container>
  );
};

export default ArtistsList;