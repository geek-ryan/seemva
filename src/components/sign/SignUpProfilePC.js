import React, { Component } from 'react';
import { Button, Icon } from 'antd';

class SingUpPC extends Component {
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
            <button
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '100%',
                border: '0',
                backgroundColor: '#eee',
                cursor: 'pointer',
              }}
              onClick={onOpenDialog}
            >
              <Icon type={loading ? 'loading' : 'plus'} />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SingUpPC;
