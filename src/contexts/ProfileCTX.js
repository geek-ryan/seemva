import React, { Component } from 'react';
import axios from 'axios';
import uploadcare from 'uploadcare-widget';

const { Provider, Consumer } = React.createContext({});
class ProfileProvider extends Component {
  state = {
    profile: '',
    loading: false,
  };

  openUploadWiget = () => {
    uploadcare
      .openDialog(null, {
        publicKey: process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY,
        imagesOnly: true,
        crop: '300x300',
        imageShrink: '300x300',
      })
      .done(this.doneUpload);
  };

  doneUpload = async file => {
    this.setState({
      loading: true,
    });
    await file.done(fileInfo => {
      this.setState({
        profile: fileInfo.cdnUrl,
        loading: false,
      });
    });
  };

  deleteProfile = async () => {
    const regExp = new RegExp(
      '[0-F]{8}-[0-F]{4}-[0-F]{4}-[0-F]{4}-[0-F]{12}',
      'i'
    );
    const imageId = this.state.profile.match(regExp)[0];
    this.setState({
      profile: '',
    });
    await axios({
      baseURL: 'https://api.uploadcare.com',
      url: `/files/${imageId}/`,
      method: 'delete',
      headers: {
        Accept: 'application/vnd.uploadcare-v0.5+json',
        Authorization: `Uploadcare.Simple ${
          process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY
        }:${process.env.REACT_APP_UPLOADCARE_PRIVATE_KEY}`,
      },
    });
  };

  render() {
    const value = {
      profile: this.state.profile,
      loading: this.state.loading,
      openUploadWiget: this.openUploadWiget,
      deleteProfile: this.deleteProfile,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProfileProvider, Consumer as ProfileConsumer };
