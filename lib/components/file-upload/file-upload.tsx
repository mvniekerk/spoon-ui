import React from 'react';
import { FilePond, FilePondProps, File } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './file-upload.scss';
import { translateItem } from 'lib/util';

interface IFileUploadProps extends FilePondProps {
  server: string;

  onFileUpdated: (fileItems: File[]) => void;
  onFileRemoved: (file: File) => void;
  onError: (error: { main: string; sub: string }, file?: File, status?: any) => void;
  onFileAdded: (error: { main: string; sub: string }, file: File) => void;
}

interface IFileUploadState {
  files: File[];
}

export class FileUpload extends React.Component<IFileUploadProps, IFileUploadState> {
  state: IFileUploadState = {
    files: []
  };

  private instance = null;

  private onFileUpdated = (fileItems: File[]) => {
    this.props.onFileUpdated && this.props.onFileUpdated(fileItems);

    this.setState({
      files: fileItems
    });
  };

  captureRef = ref => (this.instance = ref);

  render() {
    const defaultIdleLabel = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>';
    return (
      <FilePond
        ref={this.captureRef}
        files={this.state.files}
        {...this.props}
        labelIdle={this.props.labelIdle ? translateItem(this.props.labelIdle) : defaultIdleLabel}
        onupdatefiles={this.onFileUpdated}
        onremovefile={this.props.onFileRemoved}
        onaddfile={this.props.onFileAdded}
        onerror={this.props.onError}
      />
    );
  }
}
