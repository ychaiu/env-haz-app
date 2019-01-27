import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import config from '../config/config';

const cloudinaryAPI = config.cloudinaryAPI;

const cloudinaryPreset = config.cloudinaryPreset;

const cloudinaryUploadURL = config.cloudinaryUploadURL;

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  }
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  
  class DropzoneWithPreview extends React.Component {
    constructor() {
      super()
      this.state = {
        files: []
      };
    }
  
    onDrop(files) {
      this.setState({
        files: files.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      });

      this.props.handleUploadedPhotos(files);

        // // Push all the axios request promise into a single array
        // const uploaders = files.map(file => {
        // // Initial FormData
        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("tags", `codeinfuse, medium, gist`);
        // formData.append("upload_preset", cloudinaryPreset); // Replace the preset name with your own
        // formData.append("api_key", cloudinaryAPI); // Replace API key with your own Cloudinary key
        // formData.append("timestamp", (Date.now() / 1000) | 0);
        
        // // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        // return axios.post(cloudinaryUploadURL, formData, {
        //     headers: { "X-Requested-With": "XMLHttpRequest" },
        // }).then(response => {
        //     const data = response.data;
        //     const fileURL = data.secure_url // You should store this URL for future references in your app
        //     console.log(data);
        // })
        // });

        // this.setState({
        //     files: files.map(file => Object.assign(file, {
        //     preview: URL.createObjectURL(file)
        //     }))
        // });        

        // // Once all the files are uploaded 
        // // axios.all(uploaders).then(() => {
        // //   // ... perform after upload is successful operation
        // // });


    }
  
    componentWillUnmount() {
      // Make sure to revoke the data uris to avoid memory leaks
      this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  
    render() {
      const {files} = this.state;
  
      const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
            />
          </div>
        </div>
      ));
  
      return (
        <section>
          <Dropzone
            accept="image/*"
            onDrop={this.onDrop.bind(this)}
          >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop files here</p>
              </div>
            )}
          </Dropzone>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </section>
      );
    }
  }
  
export default DropzoneWithPreview;