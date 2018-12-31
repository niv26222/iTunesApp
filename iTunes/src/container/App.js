import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import * as selector from './../selectors'
import * as mainActions from '../actions/mainActions';
import ArtistsList from "../components/ArtistsList/ArtistsList";
import {withRouter} from 'react-router';
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Admin from "../components/Admin/Admin";
import Registration from "../components/Registration/Registration";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      artist: {}
    };
    this.props.getArtistsAPI();
    this.props.getUsers();

    this.toggle = this.toggle.bind(this);

  };

  toggle(artist) {
    this.setState({
      modal: !this.state.modal,
      artist
    });
  }

  handleSearchArtist = value => {
    this.props.searchArtists(value);
  };

  handleAddNewArtist = async () => {
    await this.props.getArtistsAPI(this.props.searchValue);
    console.log("handleAddNewArtist", this.props.errorArtist);

  };

  render() {
    const {loaded, searchValue, searchedArtists} = this.props;
    let Artist = this.state.artist;
    return (
      <div>
        <Header email={this.props.user}/>
        <Switch>
          <Route
            exact path="/"
            render={() =>
              <ArtistsList
                loaded={loaded}
                Artists={searchedArtists}
                value={searchValue}
                onOpenModal={this.toggle}
                onInputChange={this.handleSearchArtist}
                onAddNewArtist={this.handleAddNewArtist}
              />
            }
          />
          <Route path="/login" render={() => <Login/>}/>
          <Route path="/registration" render={() => <Registration/>}/>
          <Route path="/admin" render={() => <Admin users={this.props.users} onDelete ={this.props.deleteUser }/>}/>
        </Switch>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{Artist.artistName}
          </ModalHeader>
          <ModalBody>
            <img src={Artist.artworkUrl100} alt=""/>
            <p>country:{Artist.country} </p>
            <p>{Artist.primaryGenreName} </p>
            <p>{Artist.collectionCensoredName} </p>
            {Artist.kind === "song" ? <audio
                controls
                src={Artist.previewUrl}>
                Your browser does not support the
                <code>audio</code> element.
              </audio> :
              <p>{Artist.kind}</p>
            }
            {Artist.kind === "feature-movie" ? <video width="260" height="200" controls>
              <source src={Artist.previewUrl} type="video/mp4"/>
              <source src={Artist.previewUrl} type="video/ogg"/>
              Your browser does not support the video tag
            </video> : null
            }  </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: selector.getLoadingStatus(state),
  Artists: selector.getArtists(state),
  searchValue: selector.getSearchValue(state),
  searchedArtists: selector.getSearchedArtists(state),
  errorArtist: selector.getErrorNewArtist(state),
  user: state.mainReducer.userEmail,
  users:state.mainReducer.adminUsers
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
