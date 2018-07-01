import React, { Component } from 'react';
import { Button, Icon } from 'antd';

class SignUpProfilePC extends Component {
  static defaultProps = {
    profile: '',
    loading: false,
    onOpenDialog: () => {},
    onDeletProfile: () => {},
  };

  render() {
    const { profile, loading, onOpenDialog, onDeletProfile } = this.props;
    return (
      <div className="sign-up__profile">
        <h2>Upload Your Profile Picture</h2>
        <div className="uploader">
          {profile ? (
            <React.Fragment>
              <img src={profile} alt="profile" style={{ width: '100%' }} />
              <Button type="dashed" icon="delete" onClick={onDeletProfile}>
                Delete
              </Button>
            </React.Fragment>
          ) : (
            <button className="uploader__button" onClick={onOpenDialog}>
              <Icon type={loading ? 'loading' : 'picture'} />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SignUpProfilePC;
