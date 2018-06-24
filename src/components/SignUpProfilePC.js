import React, { Component } from 'react';
import { Upload, Icon } from 'antd';

class SingUpPC extends Component {
  static defaultProps = {
    imageUrl: '', // image url
    loading: '',
    beforeUpload: () => {},
    onChangeProfile: () => {},
  };

  render() {
    const { imageUrl, loading, beforeUpload, onChangeProfile } = this.props;
    return (
      <div className="sign-up__profile">
        <h2>Upload Your Profile Picture</h2>
        <Upload
          name="profile"
          listType="picture-card"
          className="profile-uploader"
          beforeUpload={beforeUpload}
          onChange={onChangeProfile}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="profile" style={{ width: '100%' }} />
          ) : (
            <div>
              <Icon type={loading ? 'loading' : 'plus'} />
            </div>
          )}
        </Upload>
      </div>
    );
  }
}

export default SingUpPC;
